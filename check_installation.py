#!/usr/bin/env python3
"""
Installation Validator for Thunder Video Generator
===================================================

This script checks if all required dependencies are installed correctly
and provides helpful diagnostics.
"""

import sys
import os

def check_python_version():
    """Check if Python version is 3.8+"""
    print("Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"  ✓ Python {version.major}.{version.minor}.{version.micro} (OK)")
        return True
    else:
        print(f"  ✗ Python {version.major}.{version.minor}.{version.micro} (Need 3.8+)")
        return False

def check_package(package_name, import_name=None):
    """Check if a package is installed"""
    if import_name is None:
        import_name = package_name
    
    try:
        __import__(import_name)
        print(f"  ✓ {package_name}")
        return True
    except ImportError:
        print(f"  ✗ {package_name} (not installed)")
        return False

def check_cuda():
    """Check if CUDA is available"""
    print("\nChecking GPU/CUDA availability...")
    try:
        import torch
        if torch.cuda.is_available():
            print(f"  ✓ CUDA available")
            print(f"  ✓ GPU: {torch.cuda.get_device_name(0)}")
            print(f"  ✓ CUDA version: {torch.version.cuda}")
            return True
        else:
            print(f"  ⚠ CUDA not available (will use CPU - slower)")
            return False
    except ImportError:
        print(f"  ✗ PyTorch not installed")
        return False

def check_disk_space():
    """Check available disk space"""
    print("\nChecking disk space...")
    try:
        import shutil
        # Use platform-agnostic home directory for disk space check
        check_path = os.path.expanduser("~")
        total, used, free = shutil.disk_usage(check_path)
        free_gb = free // (2**30)
        print(f"  ℹ Free space: {free_gb} GB")
        if free_gb < 15:
            print(f"  ⚠ Warning: Less than 15GB free (model cache needs ~10GB)")
        else:
            print(f"  ✓ Sufficient disk space")
        return free_gb >= 10
    except Exception as e:
        print(f"  ⚠ Could not check disk space: {e}")
        return True

def main():
    """Run all checks"""
    print("=" * 70)
    print("  Thunder Video Generator - Installation Validator")
    print("=" * 70)
    print()
    
    all_ok = True
    
    # Check Python version
    if not check_python_version():
        all_ok = False
    
    print("\nChecking required packages...")
    
    # Core packages
    packages = [
        ("torch", "torch"),
        ("diffusers", "diffusers"),
        ("transformers", "transformers"),
        ("accelerate", "accelerate"),
        ("imageio", "imageio"),
        ("opencv-python", "cv2"),
        ("pillow", "PIL"),
        ("numpy", "numpy"),
        ("tqdm", "tqdm"),
    ]
    
    for package_name, import_name in packages:
        if not check_package(package_name, import_name):
            all_ok = False
    
    # Check CUDA
    has_cuda = check_cuda()
    
    # Check disk space
    has_space = check_disk_space()
    if not has_space:
        all_ok = False
    
    # Summary
    print("\n" + "=" * 70)
    if all_ok:
        print("  ✓ All checks passed! You're ready to generate videos.")
        if not has_cuda:
            print("  ⚠ Note: No GPU detected. Video generation will be slower.")
            print("     Consider using --device cpu flag explicitly.")
    else:
        print("  ✗ Some checks failed. Please install missing dependencies:")
        print("\n     pip install -r requirements.txt")
        print("\n  For GPU support, install PyTorch with CUDA:")
        print("     Visit: https://pytorch.org/get-started/locally/")
    print("=" * 70)
    
    return 0 if all_ok else 1

if __name__ == "__main__":
    sys.exit(main())
