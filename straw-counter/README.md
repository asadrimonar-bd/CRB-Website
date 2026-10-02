# Semen Straw Counter

Single-feature browser MVP for counting semen straws from a photograph.

## Use
Open `index.html`, take/upload a photo, and review the green detection boxes. The +1/-1 controls allow quick manual correction.

## Important
This version uses lightweight browser image processing, not a trained computer-vision model. Accuracy depends strongly on lighting, tray geometry, straw separation and image quality. For production-grade counting, train an object-detection/instance-segmentation model using labeled semen-straw images.