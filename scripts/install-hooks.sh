#!/bin/bash

# Git hooks installation script
# Installs all hooks from the hooks/ directory to .git/hooks/

set -e

# Change to git repository root
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${BOLD}${BLUE}🔧 Installing Git Hooks...${NC}"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a git repository root directory${NC}"
    exit 1
fi

# Check if hooks directory exists
if [ ! -d "hooks" ]; then
    echo -e "${YELLOW}⚠️  No hooks directory found. No hooks to install.${NC}"
    exit 0
fi

# Count hooks to install
hook_count=$(find hooks -type f -perm +111 | wc -l)
if [ "$hook_count" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No executable hooks found in hooks/ directory.${NC}"
    exit 0
fi

echo -e "${BLUE}📋 Found $hook_count hook(s) to install${NC}"

# Install each hook
installed_count=0
for hook_file in hooks/*; do
    if [ -f "$hook_file" ] && [ -x "$hook_file" ]; then
        hook_name=$(basename "$hook_file")
        target_path=".git/hooks/$hook_name"
        
        # Backup existing hook if it exists
        if [ -f "$target_path" ]; then
            backup_path="$target_path.backup.$(date +%Y%m%d_%H%M%S)"
            echo -e "${YELLOW}📦 Backing up existing $hook_name to $(basename "$backup_path")${NC}"
            cp "$target_path" "$backup_path"
        fi
        
        # Copy and make executable
        cp "$hook_file" "$target_path"
        chmod +x "$target_path"
        
        echo -e "${GREEN}✅ Installed $hook_name${NC}"
        ((installed_count++))
    fi
done

echo -e "${BOLD}${GREEN}🎉 Successfully installed $installed_count git hook(s)!${NC}"

# Show what hooks are now active
echo -e "${BLUE}📝 Active git hooks:${NC}"
for hook in .git/hooks/*; do
    if [ -f "$hook" ] && [ -x "$hook" ] && [[ ! "$hook" == *.sample ]] && [[ ! "$hook" == *.backup.* ]]; then
        hook_name=$(basename "$hook")
        echo -e "  • $hook_name"
    fi
done