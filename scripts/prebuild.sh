#!/bin/bash

BRANCH_OR_TAG=yamcs-5.8.8

# Define variables
REPO_URL="git@github.com:yamcs/yamcs.git"
CLONE_DIR="yamcs_clone"
PROTO_DIR="proto"

# Clone the specified branch or tag of the repository
git clone --depth 1 --branch $BRANCH_OR_TAG $REPO_URL $CLONE_DIR

# Check if clone was successful
if [ -d "$CLONE_DIR" ]; then
    # Create the proto directory if it doesn't exist
    mkdir -p $PROTO_DIR

    # Use find to copy .proto files from the cloned directory and its subdirectories
    find $CLONE_DIR -name '*.proto' -exec cp {} $PROTO_DIR \;

    # Remove the cloned directory
    rm -rf $CLONE_DIR
else
    echo "Failed to clone the repository."
fi
