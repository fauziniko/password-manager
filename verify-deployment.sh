#!/bin/bash

# Deployment Verification Script
# Run this to verify the deployment fix is working

echo "🔍 Password Manager Deployment Verification"
echo "========================================="

# Check Node.js version
echo "Node.js version:"
node --version

# Check npm version
echo "npm version:"
npm --version

# Verify Tailwind CSS version
echo "Tailwind CSS version:"
npm list tailwindcss | grep tailwindcss

# Check for any Tailwind v4 remnants
echo "Checking for Tailwind v4 remnants:"
if npm list | grep -q "@tailwindcss/postcss\|@tailwindcss/node"; then
    echo "❌ Found Tailwind v4 packages - need to remove"
else
    echo "✅ No Tailwind v4 packages found"
fi

# Verify PostCSS config
echo "PostCSS configuration:"
if [ -f "postcss.config.mjs" ]; then
    echo "✅ postcss.config.mjs exists"
    if grep -q "tailwindcss: {}" postcss.config.mjs; then
        echo "✅ PostCSS configured for Tailwind v3"
    else
        echo "❌ PostCSS not configured correctly"
    fi
else
    echo "❌ postcss.config.mjs missing"
fi

# Test build
echo "Testing build process:"
npm run build

# Check build result
if [ $? -eq 0 ]; then
    echo "✅ Build successful - ready for deployment!"
else
    echo "❌ Build failed - check errors above"
fi

echo "========================================="
echo "Deployment verification complete"
