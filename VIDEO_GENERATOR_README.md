# Thunder Energy Video Generator 🌩️⚡

## Overview

This tool generates cinematic 8-second videos of a man absorbing energy from thunder clouds using state-of-the-art AI video generation models. The script leverages the **Zeroscope v2** text-to-video diffusion model to create high-quality, cinematic-grade videos.

## Features

✨ **Cinematic Quality**: Generates professional-grade video with dramatic lighting and effects  
⚡ **Thunder Effects**: Realistic lightning and energy transfer visualization  
🎬 **Customizable**: Full control over resolution, duration, and visual style  
🚀 **Easy to Use**: Simple command-line interface with sensible defaults  
💾 **Flexible Output**: MP4 format with configurable frame rates  
🎯 **GPU Accelerated**: CUDA support for faster generation (CPU fallback available)

## Requirements

### System Requirements
- **Python**: 3.8 or higher
- **RAM**: Minimum 8GB, 16GB+ recommended
- **GPU**: NVIDIA GPU with 8GB+ VRAM recommended (CUDA support)
  - CPU-only mode available but significantly slower
- **Storage**: ~10GB for model cache (first run only)

### Operating Systems
- Linux (recommended)
- Windows 10/11
- macOS (CPU mode only)

## Installation

### Step 1: Clone or Download

```bash
cd /path/to/MediBridge
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate on Linux/Mac
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

**Note**: First run will download the AI model (~4-6GB). This is a one-time download.

### Optional: Install xformers for Better Performance

If you have CUDA/GPU:

```bash
pip install xformers
```

## Quick Start

### Basic Usage (Recommended Settings)

```bash
python generate_thunder_video.py
```

This generates an 8-second cinematic video with default settings:
- Resolution: 576x320
- Duration: ~8 seconds (64 frames at 8 fps)
- Output: `output/thunder_energy_TIMESTAMP.mp4`

### Custom Output Directory

```bash
python generate_thunder_video.py --output-dir ./my_videos
```

### High Quality (Slower but Better)

```bash
python generate_thunder_video.py --frames 64 --steps 50 --guidance 12
```

### CPU-Only Mode (No GPU Required)

```bash
python generate_thunder_video.py --device cpu
```

**Warning**: CPU mode is significantly slower (30-60+ minutes vs 5-10 minutes on GPU)

## Advanced Usage

### Custom Prompt

Create your own cinematic scene:

```bash
python generate_thunder_video.py \
  --prompt "Epic superhero in black suit absorbing cosmic lightning from purple storm clouds, cinematic 4k"
```

### All Configuration Options

```bash
python generate_thunder_video.py \
  --output-dir ./videos \
  --frames 64 \
  --steps 30 \
  --guidance 9.5 \
  --width 576 \
  --height 320 \
  --fps 8 \
  --output-filename my_custom_video.mp4
```

## Command-Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--output-dir` | Directory for output videos | `output` |
| `--prompt` | Custom video description | (Cinematic thunder scene) |
| `--negative-prompt` | Things to avoid | (Low quality, blurry, etc.) |
| `--frames` | Number of frames (duration) | `64` (~8 sec) |
| `--steps` | Inference steps (quality) | `25` |
| `--guidance` | Prompt adherence (7-12) | `9.0` |
| `--width` | Video width in pixels | `576` |
| `--height` | Video height in pixels | `320` |
| `--fps` | Frames per second | `8` |
| `--device` | Device (cuda/cpu/auto) | `auto` |
| `--model` | HuggingFace model ID | `cerspense/zeroscope_v2_576w` |
| `--output-filename` | Custom filename | Auto-generated |

## Output

Generated videos are saved in MP4 format with the following naming:

```
output/thunder_energy_YYYYMMDD_HHMMSS.mp4
```

Example: `output/thunder_energy_20231215_143022.mp4`

## Performance Tips

### 🚀 Faster Generation
1. Use a CUDA-enabled GPU (8GB+ VRAM)
2. Install `xformers`: `pip install xformers`
3. Reduce `--steps` to 20-25 (default)
4. Use default resolution (576x320)

### 💎 Better Quality
1. Increase `--steps` to 40-50
2. Increase `--guidance` to 10-12
3. Use more specific prompts
4. Higher resolution (requires more VRAM)

### 💾 Save Memory
1. Use CPU mode: `--device cpu`
2. Reduce frames: `--frames 32`
3. Lower resolution: `--width 320 --height 176`

## Troubleshooting

### Out of Memory Error

**Solution 1**: Use CPU mode
```bash
python generate_thunder_video.py --device cpu
```

**Solution 2**: Reduce parameters
```bash
python generate_thunder_video.py --frames 32 --width 320 --height 176
```

### Model Download Issues

If the model download fails or is interrupted:

```bash
# Clear cache and retry
rm -rf ~/.cache/huggingface/
python generate_thunder_video.py
```

### Slow Generation on CPU

This is expected. CPU generation can take 30-60+ minutes. Consider:
- Running overnight
- Using a cloud GPU service (Google Colab, AWS, etc.)
- Reducing frames to 24-32

### Import Errors

Make sure all dependencies are installed:

```bash
pip install -r requirements.txt --upgrade
```

## Examples

### Example 1: Quick 4-Second Video

```bash
python generate_thunder_video.py --frames 32 --fps 8
```

### Example 2: High Quality 8-Second Video

```bash
python generate_thunder_video.py \
  --frames 64 \
  --steps 40 \
  --guidance 11 \
  --output-filename epic_thunder.mp4
```

### Example 3: Custom Superhero Scene

```bash
python generate_thunder_video.py \
  --prompt "Powerful warrior woman in armor absorbing golden lightning energy from storm, cinematic Marvel style" \
  --frames 64 \
  --steps 35
```

### Example 4: Dark Dramatic Theme

```bash
python generate_thunder_video.py \
  --prompt "Dark sorcerer channeling purple lightning from ominous clouds, gothic horror cinematography" \
  --negative-prompt "bright, colorful, cheerful, cartoon"
```

## Technical Details

### Model Information
- **Base Model**: Zeroscope v2 576w
- **Type**: Text-to-Video Diffusion Model
- **Architecture**: Latent Diffusion
- **Training**: Trained on high-quality video datasets
- **License**: Check model card on HuggingFace

### Video Specifications
- **Format**: MP4 (H.264)
- **Color Space**: RGB
- **Aspect Ratio**: 16:9 (approximately)
- **Default Resolution**: 576x320
- **Bitrate**: Variable (quality-based)

### Generation Process
1. **Text Encoding**: Prompt is converted to embeddings
2. **Latent Generation**: Model generates video in latent space
3. **Denoising**: Iterative refinement over N steps
4. **Decoding**: VAE decodes latents to pixel frames
5. **Export**: Frames compiled to MP4 video

## API Keys & Authentication

**Good News**: No API keys required! This script uses open-source models from HuggingFace that are free to use.

The model is downloaded automatically from HuggingFace on first run and cached locally.

## Limitations

- **Duration**: Model is optimized for short clips (4-12 seconds)
- **Resolution**: Base model outputs 576x320
- **Style**: Works best with cinematic/realistic prompts
- **Motion**: Better for atmospheric scenes than complex actions
- **Text**: Cannot generate readable text in videos

## Future Enhancements

Potential improvements for future versions:
- [ ] HD upscaling support (1024x576)
- [ ] Multiple scene generation
- [ ] Video-to-video editing
- [ ] Custom soundtrack integration
- [ ] Batch processing support
- [ ] Web UI interface
- [ ] ControlNet integration for better control

## Contributing

This tool is part of the MediBridge project. Contributions are welcome!

## License

This script is released under the MIT License. See LICENSE file for details.

The AI models used have their own licenses - please check the model cards on HuggingFace.

## Credits

- **Zeroscope v2**: [cerspense](https://huggingface.co/cerspense) on HuggingFace
- **Diffusers Library**: [HuggingFace](https://github.com/huggingface/diffusers)
- **MediBridge Team**: Development and integration

## Support

For issues, questions, or feature requests:
1. Check this README and troubleshooting section
2. Review HuggingFace model documentation
3. Open an issue on the GitHub repository

---

**Happy Generating! ⚡🎬**

*Create epic cinematic videos with the power of AI*
