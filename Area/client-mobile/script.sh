#!/bin/bash

# Set your Expo username and password
EXPO_USERNAME="anat94"
EXPO_PASSWORD="JhWvbRSm&dqmNq9"

# Define a function to log in non-interactively
login_expo() {
  echo "Logging in to Expo..."
  expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
}

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
  echo "Expo CLI is not installed. Please install it with 'npm install -g expo-cli' or 'yarn global add expo-cli'."
  exit 1
fi

# Run the login function
login_expo

# Check if login was successful
if [ $? -eq 0 ]; then
  echo "Login successful!"
else
  echo "Login failed. Please check your credentials."
fi
