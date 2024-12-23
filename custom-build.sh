#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
    echo "Error: No commit message provided."
    echo "Usage: ./custom-build.sh \"your commit message\""
    exit 1
fi

COMMIT_MESSAGE=$1

# Step 1: Run the build command
echo "Running npm build..."
npm run build

# Step 2: Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Step 3: Copy the contents of the dist folder to the destination
DIST_FOLDER="dist"
DESTINATION="/home/mohkeys/Desktop/projects/Nipler/nilper-build"

if [ -d "$DIST_FOLDER" ]; then
    echo "Copying contents of $DIST_FOLDER to $DESTINATION..."
    cp -r $DIST_FOLDER/* $DESTINATION
else
    echo "Build folder $DIST_FOLDER does not exist. Exiting."
    exit 1
fi

# Step 4: Navigate to the destination directory
echo "Navigating to $DESTINATION..."
cd $DESTINATION || exit

# Step 5: Add changes to Git
echo "Running git add..."
git add .

# Step 6: Commit the changes
echo "Running git commit..."
git commit -m "$COMMIT_MESSAGE"

# Step 7: Push the changes
echo "Pushing changes to the repository..."
git push

echo "Process completed successfully!"
