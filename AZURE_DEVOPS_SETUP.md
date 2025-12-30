# Azure DevOps Setup and Push Instructions

## Prerequisites
- Azure DevOps account and a new project created
- Git installed on your machine
- Azure DevOps command line tools (optional but helpful)

## Step-by-Step Instructions

### 1. Initialize Git Repository (if not already initialized)
```bash
cd c:\Users\alamm\Desktop\TesterBud_Automation
git init
```

### 2. Add Remote Repository
Replace `YOUR-ORGANIZATION` and `YOUR-PROJECT` with your Azure DevOps details:
```bash
git remote add origin https://dev.azure.com/YOUR-ORGANIZATION/YOUR-PROJECT/_git/TesterBud_Automation
```

### 3. Configure Git (if not already configured)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. Add All Files to Staging
```bash
git add .
```

### 5. Create Initial Commit
```bash
git commit -m "Initial commit: Playwright automation test suite with Azure DevOps CI/CD pipeline"
```

### 6. Push to Azure DevOps
```bash
git push -u origin main
```

## Azure DevOps Configuration

### 1. Create Pipeline
- Go to your Azure DevOps Project
- Navigate to **Pipelines** → **Pipelines**
- Click **Create Pipeline**
- Select **Azure Repos Git**
- Select your repository
- Select **Existing Azure Pipelines YAML file**
- Select `azure-pipelines.yml` from the main branch
- Click **Save and run**

### 2. Configure Pipeline Variables (Optional)
- Go to **Pipelines** → **Library**
- Create variable groups for:
  - `BaseURL`: Test environment URL
  - `TimeoutMS`: Test timeout settings

### 3. Set Up Branch Policies
- Go to **Repos** → **Branches**
- Click **...** on main branch → **Branch policies**
- Enable:
  - Require a minimum number of reviewers
  - Check for linked work items
  - Check for comment resolution
  - Enforce a merge strategy

### 4. Enable Notifications
- Go to **Project Settings** → **Notifications**
- Configure alerts for:
  - Pipeline failures
  - Test failures
  - Pull request updates

## CI/CD Pipeline Features

Your `azure-pipelines.yml` includes:
- ✅ **Build Stage**: Node.js setup, dependency installation, and linting
- ✅ **Test Stage**: Playwright test execution with retry logic (2 retries on CI)
- ✅ **Reporting Stage**: Test results and HTML report publishing
- ✅ **Artifacts**: Playwright reports and test results published for review

## Environment Variables

Create a `.env` file with necessary environment variables (not pushed to repo):
```
BASE_URL=https://testerbud.com
HEADLESS=true
TIMEOUT=60000
```

## Notes
- The pipeline runs on **ubuntu-latest** for consistency
- Tests are configured to run with 1 worker on CI for stability
- Test reports are published automatically after each run
- Both JUnit and JSON formats are generated for integration with other tools

## Troubleshooting

If pipeline fails:
1. Check **Pipeline runs** for detailed logs
2. Verify Node.js version compatibility
3. Ensure all dependencies are listed in `package.json`
4. Check environment variables are correctly set
5. Review Playwright browser installation (should happen automatically)
