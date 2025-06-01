describe('SNMP Module Workflow', () => {
  beforeEach(() => {
    // Intercepter les appels API pour éviter les dépendances externes
    cy.intercept('GET', '/api/snmp/assets', { fixture: 'snmp/assets.json' }).as('getAssets');
    cy.intercept('GET', '/api/snmp/configs', { fixture: 'snmp/configs.json' }).as('getConfigs');
    cy.intercept('POST', '/api/snmp/assets', { fixture: 'snmp/asset-created.json' }).as('createAsset');
    cy.intercept('POST', '/api/snmp/configs', { fixture: 'snmp/config-created.json' }).as('createConfig');
    cy.intercept('POST', '/api/snmp/configs/*/run', { fixture: 'snmp/scan-result.json' }).as('runScan');
    cy.intercept('GET', '/api/snmp/results*', { fixture: 'snmp/scan-history.json' }).as('getScanHistory');
    
    // Simuler l'authentification
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', 'mock-jwt-token');
    });
    
    // Visiter la page d'accueil
    cy.visit('/');
  });

  it('should complete the full SNMP workflow', () => {
    // 1. Navigation vers le module SNMP
    cy.get('[data-cy=sidebar-snmp]').click();
    cy.url().should('include', '/snmp');
    
    // Vérifier que la liste des assets se charge
    cy.wait('@getAssets');
    cy.get('[data-cy=assets-table]').should('be.visible');

    // 2. Créer un nouvel asset
    cy.get('[data-cy=add-asset-btn]').click();
    
    // Remplir le formulaire d'asset
    cy.get('[data-cy=asset-form]').should('be.visible');
    cy.get('[data-cy=hostname-input]').type('test-server.example.com');
    cy.get('[data-cy=ip-address-input]').type('192.168.1.100');
    cy.get('[data-cy=asset-type-select]').click();
    cy.get('mat-option').contains('SERVER').click();
    cy.get('[data-cy=snmp-version-select]').click();
    cy.get('mat-option').contains('V2C').click();
    cy.get('[data-cy=community-input]').type('public');
    cy.get('[data-cy=description-input]').type('Serveur de test pour démonstration SNMP');

    // Tester la connexion SNMP
    cy.intercept('POST', '/api/snmp/assets/test-connection', { 
      body: { success: true } 
    }).as('testConnection');
    
    cy.get('[data-cy=test-connection-btn]').click();
    cy.wait('@testConnection');
    cy.get('.success-snackbar').should('contain', 'Connexion SNMP réussie');

    // Sauvegarder l'asset
    cy.get('[data-cy=save-asset-btn]').click();
    cy.wait('@createAsset');
    cy.get('.success-snackbar').should('contain', 'Asset créé avec succès');

    // 3. Naviguer vers les configurations
    cy.get('[data-cy=sidebar-snmp-configs]').click();
    cy.url().should('include', '/snmp/configs');
    cy.wait('@getConfigs');

    // 4. Créer une nouvelle configuration de scan
    cy.get('[data-cy=add-config-btn]').click();
    
    // Remplir le formulaire de configuration
    cy.get('[data-cy=config-form]').should('be.visible');
    cy.get('[data-cy=config-name-input]').type('CPU Monitoring - Test Server');
    cy.get('[data-cy=asset-select]').click();
    cy.get('mat-option').contains('test-server.example.com').click();
    cy.get('[data-cy=interval-input]').type('5');
    
    // Ajouter des OIDs
    cy.get('[data-cy=add-oid-btn]').click();
    cy.get('[data-cy=oid-input-0]').type('1.3.6.1.4.1.2021.11.9.0'); // CPU User %
    cy.get('[data-cy=add-oid-btn]').click();
    cy.get('[data-cy=oid-input-1]').type('1.3.6.1.4.1.2021.11.10.0'); // CPU System %
    
    // Configurer un seuil de sévérité
    cy.get('[data-cy=add-threshold-btn]').click();
    cy.get('[data-cy=threshold-oid-select]').click();
    cy.get('mat-option').contains('1.3.6.1.4.1.2021.11.9.0').click();
    cy.get('[data-cy=threshold-max-value]').type('80');
    cy.get('[data-cy=threshold-severity-select]').click();
    cy.get('mat-option').contains('HIGH').click();

    // Sauvegarder la configuration
    cy.get('[data-cy=save-config-btn]').click();
    cy.wait('@createConfig');
    cy.get('.success-snackbar').should('contain', 'Configuration créée avec succès');

    // 5. Lancer un scan manuel
    cy.get('[data-cy=sidebar-snmp-manual-scan]').click();
    cy.url().should('include', '/snmp/manual-scan');
    
    // Sélectionner l'asset et la configuration
    cy.get('[data-cy=manual-scan-asset-select]').click();
    cy.get('mat-option').contains('test-server.example.com').click();
    cy.get('[data-cy=manual-scan-config-select]').click();
    cy.get('mat-option').contains('CPU Monitoring - Test Server').click();
    
    // Démarrer le scan
    cy.get('[data-cy=start-scan-btn]').click();
    cy.get('[data-cy=scan-loader]').should('be.visible');
    cy.wait('@runScan');
    cy.get('.success-snackbar').should('contain', 'Scan lancé avec succès');

    // 6. Consulter l'historique des scans
    cy.get('[data-cy=sidebar-snmp-history]').click();
    cy.url().should('include', '/snmp/history');
    cy.wait('@getScanHistory');
    
    // Vérifier que l'historique s'affiche
    cy.get('[data-cy=scan-history-table]').should('be.visible');
    cy.get('[data-cy=scan-result-row]').should('have.length.at.least', 1);

    // 7. Visualiser le détail d'un scan
    cy.get('[data-cy=view-scan-detail-btn]').first().click();
    cy.url().should('include', '/snmp/history/');
    
    // Vérifier les détails du scan
    cy.get('[data-cy=scan-detail-card]').should('be.visible');
    cy.get('[data-cy=scan-timestamp]').should('contain', '2024');
    cy.get('[data-cy=scan-status]').should('be.visible');
    cy.get('[data-cy=scan-values-table]').should('be.visible');
    
    // Vérifier les valeurs récupérées
    cy.get('[data-cy=oid-value-row]').should('have.length.at.least', 1);
    cy.get('[data-cy=overall-score]').should('be.visible');

    // 8. Créer un risque à partir du résultat (optionnel)
    cy.get('[data-cy=create-risk-btn]').should('be.visible');
    cy.get('[data-cy=create-risk-btn]').click();
    
    // Vérifier la redirection vers le module de gestion des risques
    cy.url().should('include', '/risks/new');
    cy.get('[data-cy=risk-form]').should('be.visible');
    
    // Vérifier que les données SNMP sont pré-remplies
    cy.get('[data-cy=risk-name-input]').should('contain.value', 'CPU');
    cy.get('[data-cy=risk-description-input]').should('contain.value', 'test-server.example.com');
  });

  it('should handle form validation errors', () => {
    // Tester la validation du formulaire d'asset
    cy.get('[data-cy=sidebar-snmp]').click();
    cy.get('[data-cy=add-asset-btn]').click();
    
    // Essayer de sauvegarder sans remplir les champs obligatoires
    cy.get('[data-cy=save-asset-btn]').click();
    
    // Vérifier les messages d'erreur
    cy.get('[data-cy=asset-type-error]').should('contain', 'obligatoire');
    cy.get('[data-cy=snmp-version-error]').should('contain', 'obligatoire');
    cy.get('[data-cy=hostname-ip-error]').should('contain', 'Au moins un hostname ou une adresse IP');

    // Tester la validation de l'adresse IP
    cy.get('[data-cy=ip-address-input]').type('invalid.ip.address');
    cy.get('[data-cy=ip-address-error]').should('contain', 'format IPv4 valide');
    
    // Corriger l'adresse IP
    cy.get('[data-cy=ip-address-input]').clear().type('192.168.1.100');
    cy.get('[data-cy=ip-address-error]').should('not.exist');
  });

  it('should handle SNMP connection test failures', () => {
    cy.get('[data-cy=sidebar-snmp]').click();
    cy.get('[data-cy=add-asset-btn]').click();
    
    // Remplir le formulaire avec des données valides
    cy.get('[data-cy=hostname-input]').type('unreachable-server.example.com');
    cy.get('[data-cy=asset-type-select]').click();
    cy.get('mat-option').contains('SERVER').click();
    cy.get('[data-cy=snmp-version-select]').click();
    cy.get('mat-option').contains('V2C').click();
    cy.get('[data-cy=community-input]').type('wrong-community');

    // Simuler un échec de connexion
    cy.intercept('POST', '/api/snmp/assets/test-connection', { 
      body: { success: false, error: 'Connection timeout' } 
    }).as('testConnectionFail');
    
    cy.get('[data-cy=test-connection-btn]').click();
    cy.wait('@testConnectionFail');
    cy.get('.error-snackbar').should('contain', 'Échec de la connexion');
  });

  it('should support SNMP v3 configuration', () => {
    cy.get('[data-cy=sidebar-snmp]').click();
    cy.get('[data-cy=add-asset-btn]').click();
    
    // Configurer SNMP v3
    cy.get('[data-cy=hostname-input]').type('secure-server.example.com');
    cy.get('[data-cy=asset-type-select]').click();
    cy.get('mat-option').contains('SWITCH').click();
    cy.get('[data-cy=snmp-version-select]').click();
    cy.get('mat-option').contains('V3').click();
    
    // Vérifier que les champs SNMP v3 apparaissent
    cy.get('[data-cy=snmp-v3-config]').should('be.visible');
    cy.get('[data-cy=username-input]').should('be.visible');
    cy.get('[data-cy=auth-protocol-select]').should('be.visible');
    
    // Remplir les champs SNMP v3
    cy.get('[data-cy=username-input]').type('admin');
    cy.get('[data-cy=auth-protocol-select]').click();
    cy.get('mat-option').contains('SHA').click();
    cy.get('[data-cy=auth-password-input]').type('authpassword123');
    cy.get('[data-cy=priv-protocol-select]').click();
    cy.get('mat-option').contains('AES128').click();
    cy.get('[data-cy=priv-password-input]').type('privpassword123');
    
    // Vérifier que la validation fonctionne
    cy.get('[data-cy=save-asset-btn]').should('not.be.disabled');
  });

  it('should filter and search assets', () => {
    cy.get('[data-cy=sidebar-snmp]').click();
    cy.wait('@getAssets');
    
    // Tester le filtre par type
    cy.get('[data-cy=asset-type-filter]').click();
    cy.get('mat-option').contains('SERVER').click();
    cy.get('[data-cy=asset-row]').should('have.length.at.least', 1);
    cy.get('[data-cy=asset-type-chip]').should('contain', 'SERVER');
    
    // Tester la recherche par hostname
    cy.get('[data-cy=search-input]').type('server01');
    cy.get('[data-cy=asset-row]').should('have.length.at.most', 2);
    
    // Effacer les filtres
    cy.get('[data-cy=clear-filters-btn]').click();
    cy.get('[data-cy=asset-row]').should('have.length.at.least', 3);
  });
}); 