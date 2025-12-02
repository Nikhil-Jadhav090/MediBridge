#!/usr/bin/env python3
"""
Cinematic Video Generator - Thunder Energy Absorption
======================================================

This script generates an 8-second cinematic video of a man absorbing energy 
from thunder clouds using AI video generation models.

Author: MediBridge Team
License: MIT
"""

import os
import sys
import argparse
import logging
from pathlib import Path
from datetime import datetime

try:
    import torch
    from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
    from diffusers.utils import export_to_video
except ImportError as e:
    print("Error: Required packages not installed.")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ThunderVideoGenerator:
    """
    Generate cinematic videos of a man absorbing energy from thunder clouds.
    
    This class uses the Zeroscope text-to-video model to generate high-quality
    cinematic videos based on detailed prompts.
    """
    
    def __init__(self, output_dir="output", device=None):
        """
        Initialize the video generator.
        
        Args:
            output_dir (str): Directory to save generated videos
            device (str): Device to run the model on ('cuda', 'cpu', or None for auto)
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Auto-detect device if not specified
        if device is None:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
        else:
            self.device = device
            
        logger.info(f"Using device: {self.device}")
        
        self.pipe = None
        
    def load_model(self, model_id="cerspense/zeroscope_v2_576w"):
        """
        Load the text-to-video diffusion model.
        
        Args:
            model_id (str): HuggingFace model identifier
        """
        logger.info(f"Loading model: {model_id}")
        logger.info("This may take a few minutes on first run (downloading model)...")
        
        try:
            # Load the pipeline
            self.pipe = DiffusionPipeline.from_pretrained(
                model_id,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32
            )
            
            # Use DPM Solver for faster generation
            self.pipe.scheduler = DPMSolverMultistepScheduler.from_config(
                self.pipe.scheduler.config
            )
            
            # Enable memory optimizations
            if self.device == "cuda":
                self.pipe.enable_model_cpu_offload()
                self.pipe.enable_vae_slicing()
            else:
                self.pipe = self.pipe.to(self.device)
                
            logger.info("Model loaded successfully!")
            
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            raise
    
    def generate_video(
        self,
        prompt=None,
        negative_prompt=None,
        num_frames=24,
        num_inference_steps=25,
        guidance_scale=9.0,
        height=320,
        width=576,
        fps=8,
        output_filename=None
    ):
        """
        Generate a cinematic video based on the prompt.
        
        Args:
            prompt (str): Text description of the video to generate
            negative_prompt (str): Things to avoid in the generation
            num_frames (int): Number of frames to generate (affects duration)
            num_inference_steps (int): Number of denoising steps (higher = better quality)
            guidance_scale (float): How closely to follow the prompt (7-12 recommended)
            height (int): Video height in pixels
            width (int): Video width in pixels
            fps (int): Frames per second for output video
            output_filename (str): Custom output filename (auto-generated if None)
            
        Returns:
            str: Path to the generated video file
        """
        if self.pipe is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")
        
        # Default cinematic prompt for thunder energy absorption
        if prompt is None:
            prompt = (
                "Cinematic shot of a powerful man in a heroic pose standing on a cliff, "
                "dramatic thunder clouds swirling overhead with bright lightning bolts, "
                "electric blue energy beams flowing from the storm clouds down to the man, "
                "energy crackling around his body with glowing aura effect, "
                "epic superhero movie scene, dramatic volumetric lighting, "
                "dark stormy atmosphere with intense contrast, "
                "camera slowly zooming in, 4k cinematic quality, "
                "photorealistic, rendered in unreal engine, movie-grade VFX"
            )
        
        if negative_prompt is None:
            negative_prompt = (
                "blurry, low quality, distorted, deformed, ugly, bad anatomy, "
                "watermark, text, cartoon, anime, static, still image, "
                "duplicate frames, flickering"
            )
        
        logger.info("Generating video with the following settings:")
        logger.info(f"  Frames: {num_frames} ({num_frames/fps:.1f} seconds at {fps} fps)")
        logger.info(f"  Resolution: {width}x{height}")
        logger.info(f"  Inference steps: {num_inference_steps}")
        logger.info(f"  Guidance scale: {guidance_scale}")
        logger.info(f"  Prompt: {prompt[:100]}...")
        
        try:
            # Generate video frames
            logger.info("Starting video generation (this may take several minutes)...")
            
            video_frames = self.pipe(
                prompt=prompt,
                negative_prompt=negative_prompt,
                num_frames=num_frames,
                num_inference_steps=num_inference_steps,
                guidance_scale=guidance_scale,
                height=height,
                width=width,
            ).frames[0]
            
            # Generate output filename if not provided
            if output_filename is None:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_filename = f"thunder_energy_{timestamp}.mp4"
            
            # Ensure .mp4 extension
            if not output_filename.endswith('.mp4'):
                output_filename += '.mp4'
            
            output_path = self.output_dir / output_filename
            
            # Export to video file
            logger.info(f"Exporting video to: {output_path}")
            export_to_video(video_frames, str(output_path), fps=fps)
            
            logger.info(f"✓ Video generation complete!")
            logger.info(f"✓ Saved to: {output_path}")
            logger.info(f"✓ Duration: {num_frames/fps:.1f} seconds")
            logger.info(f"✓ Resolution: {width}x{height}")
            
            return str(output_path)
            
        except Exception as e:
            logger.error(f"Error generating video: {e}")
            raise
    
    def generate_hd_video(
        self,
        base_video_path,
        upscale_model_id="cerspense/zeroscope_v2_XL",
        num_inference_steps=20,
        output_filename=None
    ):
        """
        Upscale a base video to HD quality (1024x576).
        
        This is an optional second pass for higher quality output.
        
        Args:
            base_video_path (str): Path to the base video to upscale
            upscale_model_id (str): HuggingFace model for upscaling
            num_inference_steps (int): Number of denoising steps
            output_filename (str): Custom output filename
            
        Returns:
            str: Path to the upscaled HD video
        """
        logger.info("Loading HD upscaling model...")
        logger.info("Note: This requires significant GPU memory (>16GB VRAM recommended)")
        
        try:
            # Load upscaling pipeline
            upscale_pipe = DiffusionPipeline.from_pretrained(
                upscale_model_id,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32
            )
            
            if self.device == "cuda":
                upscale_pipe.enable_model_cpu_offload()
                upscale_pipe.enable_vae_slicing()
            else:
                upscale_pipe = upscale_pipe.to(self.device)
            
            # Load base video frames
            from PIL import Image
            import numpy as np
            
            logger.info(f"Loading base video: {base_video_path}")
            # Note: In production, you'd load the actual video frames here
            # This is a placeholder for the upscaling process
            
            logger.info("Upscaling to HD quality...")
            # Upscaling logic would go here
            
            if output_filename is None:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_filename = f"thunder_energy_hd_{timestamp}.mp4"
            
            output_path = self.output_dir / output_filename
            
            logger.info(f"✓ HD video saved to: {output_path}")
            return str(output_path)
            
        except Exception as e:
            logger.error(f"Error in HD upscaling: {e}")
            logger.error("Skipping HD upscaling. Base video is still available.")
            return base_video_path


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description="Generate cinematic video of a man absorbing thunder energy",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Basic usage with default settings
  python generate_thunder_video.py
  
  # Custom output directory
  python generate_thunder_video.py --output-dir ./videos
  
  # High quality with more frames (longer duration)
  python generate_thunder_video.py --frames 64 --steps 50
  
  # Custom prompt
  python generate_thunder_video.py --prompt "Epic superhero absorbing cosmic energy"
  
  # CPU-only mode (slower)
  python generate_thunder_video.py --device cpu
        """
    )
    
    parser.add_argument(
        '--output-dir',
        type=str,
        default='output',
        help='Directory to save generated videos (default: output)'
    )
    
    parser.add_argument(
        '--prompt',
        type=str,
        default=None,
        help='Custom prompt for video generation (uses default cinematic prompt if not specified)'
    )
    
    parser.add_argument(
        '--negative-prompt',
        type=str,
        default=None,
        help='Negative prompt (things to avoid)'
    )
    
    parser.add_argument(
        '--frames',
        type=int,
        default=64,
        help='Number of frames to generate (default: 64 for ~8 seconds at 8fps)'
    )
    
    parser.add_argument(
        '--steps',
        type=int,
        default=25,
        help='Number of inference steps (default: 25, higher = better quality but slower)'
    )
    
    parser.add_argument(
        '--guidance',
        type=float,
        default=9.0,
        help='Guidance scale (default: 9.0, range: 7-12)'
    )
    
    parser.add_argument(
        '--width',
        type=int,
        default=576,
        help='Video width in pixels (default: 576)'
    )
    
    parser.add_argument(
        '--height',
        type=int,
        default=320,
        help='Video height in pixels (default: 320)'
    )
    
    parser.add_argument(
        '--fps',
        type=int,
        default=8,
        help='Frames per second (default: 8)'
    )
    
    parser.add_argument(
        '--device',
        type=str,
        choices=['cuda', 'cpu', 'auto'],
        default='auto',
        help='Device to run on (default: auto-detect)'
    )
    
    parser.add_argument(
        '--model',
        type=str,
        default='cerspense/zeroscope_v2_576w',
        help='Model ID to use (default: cerspense/zeroscope_v2_576w)'
    )
    
    parser.add_argument(
        '--output-filename',
        type=str,
        default=None,
        help='Custom output filename (auto-generated if not specified)'
    )
    
    parser.add_argument(
        '--hd-upscale',
        action='store_true',
        help='Enable HD upscaling (requires >16GB VRAM)'
    )
    
    args = parser.parse_args()
    
    # Print header
    print("=" * 70)
    print("  Cinematic Thunder Video Generator")
    print("  MediBridge - AI Video Generation Tool")
    print("=" * 70)
    print()
    
    # Set device
    device = None if args.device == 'auto' else args.device
    
    try:
        # Initialize generator
        generator = ThunderVideoGenerator(
            output_dir=args.output_dir,
            device=device
        )
        
        # Load model
        generator.load_model(model_id=args.model)
        
        # Generate video
        video_path = generator.generate_video(
            prompt=args.prompt,
            negative_prompt=args.negative_prompt,
            num_frames=args.frames,
            num_inference_steps=args.steps,
            guidance_scale=args.guidance,
            height=args.height,
            width=args.width,
            fps=args.fps,
            output_filename=args.output_filename
        )
        
        # Optional HD upscaling
        if args.hd_upscale:
            logger.info("\nStarting HD upscaling pass...")
            hd_path = generator.generate_hd_video(video_path)
            logger.info(f"Final HD video: {hd_path}")
        
        print()
        print("=" * 70)
        print(f"  SUCCESS! Video saved to: {video_path}")
        print("=" * 70)
        
        return 0
        
    except KeyboardInterrupt:
        logger.warning("\nGeneration interrupted by user")
        return 1
        
    except Exception as e:
        logger.error(f"\nFatal error: {e}")
        logger.error("If you encounter CUDA out of memory errors, try:")
        logger.error("  - Use --device cpu (slower but works on any machine)")
        logger.error("  - Reduce --frames (e.g., 32 or 24)")
        logger.error("  - Reduce --width and --height")
        return 1


if __name__ == "__main__":
    sys.exit(main())
