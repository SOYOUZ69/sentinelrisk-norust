SentinelRisk Product Specification
Product Specification - SentinelRisk (version Spring Boot + Angular)
Product Name: SentinelRisk
Product Specification
SentinelRisk is a next-generation risk management and compliance platform designed to help organizations identify,
assess, and mitigate risks efficiently. It enables structured risk tracking, real-time analytics, and automated compliance
management through a scalable, API-driven architecture.
Key Features
Risk Management
- Centralized risk repository with categorization
- Risk lifecycle management: Identification -> Assessment -> Treatment -> Monitoring
- Custom risk scoring models
- Risk acceptance, mitigation, transfer, and escalation workflows
- Automated risk review cycles
Risk Assessment & Analysis
- Multi-dimensional risk assessment models
- Dynamic risk calculation using quantitative and qualitative methods
- Heatmaps & risk trend forecasting
- Impact vs. likelihood matrix generation
Compliance & Audit Management
- Predefined compliance mappings (ISO 27001, NIST, SOC 2, GDPR, etc.)
- Automated control verification and gap analysis
- Internal and external audit tracking
- Policy & control document repository
SentinelRisk Product Specification
Incident & Remediation Tracking
- Incident logging & classification
- Root cause analysis and mitigation tracking
- SLA-based remediation plans
- Automated escalation mechanisms
Advanced Reporting & Analytics
- Customizable risk dashboards
- Risk trend visualization and heatmaps
- Scheduled and on-demand executive risk reports
- Predictive analytics for emerging risks
User & Access Control
- Role-Based Access Control (RBAC) with granular permissions
- Multi-user support with workflow approvals
- Single Sign-On (SSO) and Multi-Factor Authentication (MFA) integration
Integrations & API-First Approach
- REST API for seamless integration with third-party tools
- Webhooks for real-time event notifications
- CSV/JSON-based risk import/export for bulk management
Deployment & Infrastructure
- Cloud-native & on-premise deployment
- Microservices architecture based on Spring Boot
- Secure encrypted database storage with PostgreSQL
Technology Stack
- Backend: Java (Spring Boot for robust, scalable APIs)
- Frontend: Angular (for a modern, responsive, and component-based UI)
- Database: PostgreSQL
- Authentication: Keycloak integration for Identity and Access Management (IAM)
SentinelRisk Product Specification
- Deployment: Docker, Kubernetes
Conclusion
SentinelRisk provides a scalable, secure risk management and compliance platform, now leveraging Spring Boot for
high-performance backend services and Angular for a dynamic and interactive frontend experience. This modern
architecture enables seamless integration, real-time analytics, and an exceptional user experience tailored to enterprise
risk governance needs.

//
commandes lancement 
//frontend :  ng serve
//backend :  ./mvnw spring-boot:run 
//docker :  docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up --build -d