import { Component, OnInit } from '@angular/core';
import { SnmpScanConfig } from '../../models/scan-config.model';
import { SnmpService } from '../../services/snmp.service';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit {
  configs: SnmpScanConfig[] = [];
  loading = false;

  constructor(private snmpService: SnmpService) {}

  ngOnInit(): void {
    this.loadConfigs();
  }

  loadConfigs(): void {
    this.loading = true;
    this.snmpService.getAllConfigs().subscribe({
      next: (configs) => {
        this.configs = configs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des configurations:', error);
        this.loading = false;
      }
    });
  }
}
