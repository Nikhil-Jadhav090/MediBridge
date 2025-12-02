#!/usr/bin/env python3
"""
Example Usage Script for Thunder Video Generator
=================================================

This script demonstrates different ways to use the thunder video generator.
Run each example separately by uncommenting the desired section.
"""

import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Example 1: Basic usage with default settings
def example_basic():
    """Generate a basic 8-second cinematic thunder video."""
    print("Example 1: Basic Thunder Video")
    print("-" * 50)
    os.system("python generate_thunder_video.py")


# Example 2: Quick low-resolution test
def example_quick_test():
    """Generate a quick low-res video for testing (faster)."""
    print("Example 2: Quick Test Video")
    print("-" * 50)
    os.system("""
        python generate_thunder_video.py \
            --frames 24 \
            --steps 15 \
            --width 320 \
            --height 176 \
            --output-filename quick_test.mp4
    """)


# Example 3: High quality production video
def example_high_quality():
    """Generate a high-quality cinematic video."""
    print("Example 3: High Quality Video")
    print("-" * 50)
    os.system("""
        python generate_thunder_video.py \
            --frames 64 \
            --steps 40 \
            --guidance 11 \
            --output-filename high_quality_thunder.mp4
    """)


# Example 4: Custom superhero scene
def example_custom_prompt():
    """Generate a custom superhero scene."""
    print("Example 4: Custom Superhero Scene")
    print("-" * 50)
    
    custom_prompt = (
        "Powerful superhero in cape standing on mountain peak, "
        "absorbing bright blue lightning from massive storm clouds, "
        "energy crackling around entire body, "
        "epic Marvel cinematic universe style, "
        "dramatic lighting, 4k quality"
    )
    
    os.system(f"""
        python generate_thunder_video.py \
            --prompt "{custom_prompt}" \
            --frames 64 \
            --steps 30 \
            --output-filename superhero_thunder.mp4
    """)


# Example 5: Dark fantasy theme
def example_dark_fantasy():
    """Generate a dark fantasy thunder absorption scene."""
    print("Example 5: Dark Fantasy Theme")
    print("-" * 50)
    
    fantasy_prompt = (
        "Dark sorcerer in flowing robes channeling purple lightning, "
        "ominous storm clouds with green tint, "
        "gothic architecture in background, "
        "dark fantasy cinematography, dramatic shadows"
    )
    
    negative_prompt = (
        "bright, cheerful, cartoon, anime, "
        "modern buildings, daylight"
    )
    
    os.system(f"""
        python generate_thunder_video.py \
            --prompt "{fantasy_prompt}" \
            --negative-prompt "{negative_prompt}" \
            --frames 64 \
            --output-filename dark_fantasy_thunder.mp4
    """)


# Example 6: CPU mode (no GPU required)
def example_cpu_mode():
    """Generate video using CPU only (slower but works without GPU)."""
    print("Example 6: CPU Mode (No GPU Required)")
    print("-" * 50)
    print("WARNING: This will be slow (30-60+ minutes)")
    
    response = input("Continue? (y/n): ")
    if response.lower() != 'y':
        print("Skipped.")
        return
    
    os.system("""
        python generate_thunder_video.py \
            --device cpu \
            --frames 32 \
            --steps 20 \
            --output-filename cpu_thunder.mp4
    """)


def print_menu():
    """Display the example menu."""
    print("\n" + "=" * 70)
    print("  Thunder Video Generator - Example Usage")
    print("=" * 70)
    print("\nAvailable Examples:")
    print("  1. Basic thunder video (default settings)")
    print("  2. Quick test video (low-res, faster)")
    print("  3. High quality production video")
    print("  4. Custom superhero scene")
    print("  5. Dark fantasy theme")
    print("  6. CPU mode (no GPU)")
    print("  0. Exit")
    print("\nNOTE: Make sure you have installed dependencies first:")
    print("      pip install -r requirements.txt")
    print("=" * 70)


def main():
    """Main menu for running examples."""
    
    examples = {
        '1': example_basic,
        '2': example_quick_test,
        '3': example_high_quality,
        '4': example_custom_prompt,
        '5': example_dark_fantasy,
        '6': example_cpu_mode,
    }
    
    while True:
        print_menu()
        choice = input("\nSelect example (0-6): ").strip()
        
        if choice == '0':
            print("Goodbye!")
            break
        
        if choice in examples:
            print("\n")
            examples[choice]()
            input("\nPress Enter to continue...")
        else:
            print("Invalid choice. Please select 0-6.")


if __name__ == "__main__":
    main()
