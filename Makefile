# Makefile untuk Docker Commands

.DEFAULT_GOAL := help
.PHONY: help

# Colors
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m  # No Color

help: ## Tampilkan bantuan
	@echo "$(CYAN)═══════════════════════════════════════════════════════$(NC)"
	@echo "$(GREEN)  Puri Bunda Queue System - Docker Commands$(NC)"
	@echo "$(CYAN)═══════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(YELLOW)Development Commands:$(NC)"
	@echo "  $(GREEN)make dev-up$(NC)         - Start development environment"
	@echo "  $(GREEN)make dev-down$(NC)       - Stop development environment"
	@echo "  $(GREEN)make dev-restart$(NC)    - Restart development services"
	@echo "  $(GREEN)make dev-logs$(NC)       - View development logs"
	@echo "  $(GREEN)make dev-build$(NC)      - Rebuild development containers"
	@echo ""
	@echo "$(YELLOW)Production Commands:$(NC)"
	@echo "  $(GREEN)make prod-up$(NC)        - Start production environment"
	@echo "  $(GREEN)make prod-down$(NC)      - Stop production environment"
	@echo "  $(GREEN)make prod-restart$(NC)   - Restart production services"
	@echo "  $(GREEN)make prod-logs$(NC)      - View production logs"
	@echo "  $(GREEN)make prod-build$(NC)     - Rebuild production containers"
	@echo ""
	@echo "$(YELLOW)Database Commands:$(NC)"
	@echo "  $(GREEN)make db-shell$(NC)       - Access PostgreSQL shell"
	@echo "  $(GREEN)make db-backup$(NC)      - Backup database"
	@echo "  $(GREEN)make db-restore$(NC)     - Restore database from backup"
	@echo "  $(GREEN)make db-migrate$(NC)     - Run database migrations"
	@echo ""
	@echo "$(YELLOW)Service Commands:$(NC)"
	@echo "  $(GREEN)make backend-shell$(NC)  - Access backend container shell"
	@echo "  $(GREEN)make frontend-shell$(NC) - Access frontend container shell"
	@echo "  $(GREEN)make backend-logs$(NC)   - View backend logs"
	@echo "  $(GREEN)make frontend-logs$(NC)  - View frontend logs"
	@echo ""
	@echo "$(YELLOW)Clean Commands:$(NC)"
	@echo "  $(GREEN)make clean$(NC)          - Stop and remove containers"
	@echo "  $(GREEN)make clean-all$(NC)      - Remove containers, volumes, and images"
	@echo ""

# ============================================
# Development Commands
# ============================================

dev-up: ## Start development environment
	@echo "$(GREEN)Starting development environment...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Development environment started!$(NC)"
	@echo "$(CYAN)Frontend: http://localhost:5173$(NC)"
	@echo "$(CYAN)Backend:  http://localhost:3000$(NC)"
	@echo "$(CYAN)Database: postgresql://localhost:5432$(NC)"

dev-down: ## Stop development environment
	@echo "$(YELLOW)Stopping development environment...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Development environment stopped!$(NC)"

dev-restart: ## Restart development services
	@echo "$(YELLOW)Restarting development services...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Services restarted!$(NC)"

dev-logs: ## View development logs
	docker-compose logs -f

dev-build: ## Rebuild development containers
	@echo "$(YELLOW)Building development containers...$(NC)"
	docker-compose up -d --build
	@echo "$(GREEN)✓ Containers rebuilt!$(NC)"

dev-ps: ## List running containers
	docker-compose ps

# ============================================
# Production Commands
# ============================================

prod-up: ## Start production environment
	@echo "$(GREEN)Starting production environment...$(NC)"
	docker-compose -f docker-compose.prod.yml up -d
	@echo "$(GREEN)✓ Production environment started!$(NC)"
	@echo "$(CYAN)Frontend: http://localhost$(NC)"
	@echo "$(CYAN)Backend:  http://localhost:3000$(NC)"

prod-down: ## Stop production environment
	@echo "$(YELLOW)Stopping production environment...$(NC)"
	docker-compose -f docker-compose.prod.yml down
	@echo "$(GREEN)✓ Production environment stopped!$(NC)"

prod-restart: ## Restart production services
	@echo "$(YELLOW)Restarting production services...$(NC)"
	docker-compose -f docker-compose.prod.yml restart
	@echo "$(GREEN)✓ Services restarted!$(NC)"

prod-logs: ## View production logs
	docker-compose -f docker-compose.prod.yml logs -f

prod-build: ## Build production containers
	@echo "$(YELLOW)Building production containers...$(NC)"
	docker-compose -f docker-compose.prod.yml build --no-cache
	@echo "$(GREEN)✓ Production containers built!$(NC)"

prod-deploy: ## Deploy production (build + up)
	@echo "$(GREEN)Deploying production...$(NC)"
	docker-compose -f docker-compose.prod.yml build --no-cache
	docker-compose -f docker-compose.prod.yml up -d
	@echo "$(GREEN)✓ Production deployed!$(NC)"

# ============================================
# Database Commands
# ============================================

db-shell: ## Access PostgreSQL shell
	@echo "$(CYAN)Connecting to database...$(NC)"
	docker-compose exec postgres psql -U dbuser -d puri_bunda_db

db-backup: ## Backup database
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@mkdir -p backups
	docker-compose exec postgres pg_dump -U dbuser puri_bunda_db > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✓ Backup created in backups/ directory$(NC)"

db-restore: ## Restore database from backup (usage: make db-restore FILE=backup.sql)
	@echo "$(YELLOW)Restoring database from $(FILE)...$(NC)"
	docker-compose exec -T postgres psql -U dbuser -d puri_bunda_db < backups/$(FILE)
	@echo "$(GREEN)✓ Database restored!$(NC)"

db-migrate: ## Run database migrations
	@echo "$(YELLOW)Running migrations...$(NC)"
	docker-compose exec backend pnpm run migration:run
	@echo "$(GREEN)✓ Migrations completed!$(NC)"

db-migrate-create: ## Create new migration (usage: make db-migrate-create NAME=add_users_table)
	@echo "$(YELLOW)Creating migration...$(NC)"
	docker-compose exec backend pnpm run migration:create $(NAME)

# ============================================
# Service Commands
# ============================================

backend-shell: ## Access backend container shell
	docker-compose exec backend sh

frontend-shell: ## Access frontend container shell
	docker-compose exec frontend sh

backend-logs: ## View backend logs
	docker-compose logs -f backend

frontend-logs: ## View frontend logs
	docker-compose logs -f frontend

postgres-logs: ## View PostgreSQL logs
	docker-compose logs -f postgres

# ============================================
# Install & Setup Commands
# ============================================

install: ## Install dependencies in containers
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	docker-compose exec backend pnpm install
	docker-compose exec frontend pnpm install
	@echo "$(GREEN)✓ Dependencies installed!$(NC)"

setup: ## Initial setup (create .env files)
	@echo "$(YELLOW)Setting up environment files...$(NC)"
	@cp -n backend/.env.example backend/.env 2>/dev/null || true
	@cp -n frontend/.env.example frontend/.env 2>/dev/null || true
	@echo "$(GREEN)✓ Environment files created!$(NC)"
	@echo "$(CYAN)Please update the .env files with your configuration$(NC)"

# ============================================
# Clean Commands
# ============================================

clean: ## Stop and remove containers
	@echo "$(RED)Stopping and removing containers...$(NC)"
	docker-compose down
	docker-compose -f docker-compose.prod.yml down
	@echo "$(GREEN)✓ Containers removed!$(NC)"

clean-volumes: ## Stop and remove containers with volumes
	@echo "$(RED)Stopping and removing containers with volumes...$(NC)"
	docker-compose down -v
	docker-compose -f docker-compose.prod.yml down -v
	@echo "$(GREEN)✓ Containers and volumes removed!$(NC)"

clean-all: ## Remove everything (containers, volumes, images)
	@echo "$(RED)Removing all Docker resources...$(NC)"
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all
	@echo "$(GREEN)✓ All resources removed!$(NC)"

prune: ## Clean up unused Docker resources
	@echo "$(RED)Cleaning up unused Docker resources...$(NC)"
	docker system prune -af --volumes
	@echo "$(GREEN)✓ Cleanup completed!$(NC)"

# ============================================
# Testing Commands
# ============================================

test-backend: ## Run backend tests
	docker-compose exec backend pnpm run test

test-frontend: ## Run frontend tests
	docker-compose exec frontend pnpm run test

# ============================================
# Utility Commands
# ============================================

status: ## Show status of all services
	@echo "$(CYAN)═══════════════════════════════════════$(NC)"
	@echo "$(GREEN)Service Status$(NC)"
	@echo "$(CYAN)═══════════════════════════════════════$(NC)"
	@docker-compose ps

health: ## Check health of all services
	@echo "$(CYAN)Checking service health...$(NC)"
	@docker-compose ps | grep "Up"
	@echo "$(GREEN)✓ Health check completed!$(NC)"