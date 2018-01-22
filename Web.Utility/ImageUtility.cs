﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;

namespace Web.Utility
{
    public static class ImageHelper
    {
        /// <summary> 
        ///  生成缩略图 静态方法    
        /// </summary> 
        /// <param name="fileStream"> 文件流 </param> 
        /// <param name="saveToPath"> 生成的缩略图所保存的路径(含文件名及扩展名) 
        ///                            注意：扩展名一定要与生成的缩略图格式相对应 </param> 
        /// <param name="width"> 欲生成的缩略图 "画布" 的宽度(像素值) </param> 
        /// <param name="height"> 欲生成的缩略图 "画布" 的高度(像素值) </param> 
        public static void MakeThumbnail(Stream fileStream, string saveToPath, int width, int height)
        {
            Image imageFrom = null;
            try
            {
                imageFrom = Image.FromStream(fileStream);
            }
            catch
            {
                //throw; 
            }
            if (imageFrom == null)
            {
                return;
            }
            // 源图宽度及高度 
            int imageFromWidth = imageFrom.Width;
            int imageFromHeight = imageFrom.Height;
            // 生成的缩略图实际宽度及高度 
            int bitmapWidth = width;
            int bitmapHeight = height;
            // 生成的缩略图在上述"画布"上的位置 
            int X = 0;
            int Y = 0;
            // 根据源图及欲生成的缩略图尺寸,计算缩略图的实际尺寸及其在"画布"上的位置 
            if (bitmapHeight * imageFromWidth > bitmapWidth * imageFromHeight)
            {
                bitmapHeight = imageFromHeight * width / imageFromWidth;
                Y = (width - bitmapHeight) / 2;
            }
            else
            {
                bitmapWidth = imageFromWidth * height / imageFromHeight;
                X = (width - bitmapWidth) / 2;
            }
            // 创建画布 
            Bitmap bmp = new Bitmap(width, height);
            Graphics g = Graphics.FromImage(bmp);
            // 用白色清空 
            g.Clear(Color.White);
            // 指定高质量的双三次插值法。执行预筛选以确保高质量的收缩。此模式可产生质量最高的转换图像。 
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            // 指定高质量、低速度呈现。 
            g.SmoothingMode = SmoothingMode.HighQuality;
            // 在指定位置并且按指定大小绘制指定的 Image 的指定部分。 
            g.DrawImage(imageFrom, new Rectangle(X, Y, bitmapWidth, bitmapHeight), new Rectangle(0, 0, imageFromWidth, imageFromHeight), GraphicsUnit.Pixel);
            try
            {
                //经测试 .jpg 格式缩略图大小与质量等最优 
                bmp.Save(saveToPath, ImageFormat.Jpeg);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                //显示释放资源 
                imageFrom.Dispose();
                bmp.Dispose();
                g.Dispose();
            }
        }

        /// <summary>
        /// 生成缩略图(裁切原图并缩小到指定尺寸)
        /// </summary>
        /// <param name="fromPath">原图路径</param>
        /// <param name="saveToPath">缩略图路径</param>
        /// <param name="width">缩略图宽度</param>
        /// <param name="height">缩略图高度</param>
        /// <returns></returns>
        public static bool MakeThumbnail(string fromPath, string saveToPath, int width, int height)
        {
            if (!File.Exists(fromPath))
                return false;

            int srcWidth = 0, srcHeight = 0;

            using (Image image = Image.FromFile(fromPath))
            {
                if (image.Width > width && image.Height > height)
                {
                    if ((float)image.Width / (float)width > (float)image.Height / (float)height)
                    {
                        srcWidth = image.Height * width / height;
                        srcHeight = image.Height;
                    }
                    else
                    {
                        srcWidth = image.Width;
                        srcHeight = image.Width * height / width;
                    }
                }
                else
                {
                    srcWidth = image.Width;
                    srcHeight = image.Height;
                    width = image.Width;
                    height = image.Height;
                }

                using (Image bitmap = new Bitmap(width, height))
                {
                    using (Graphics graphics = Graphics.FromImage(bitmap))
                    {
                        graphics.InterpolationMode = InterpolationMode.High;
                        graphics.SmoothingMode = SmoothingMode.HighQuality;
                        graphics.Clear(Color.Transparent);
                        graphics.DrawImage(image, new Rectangle(0, 0, width, height), 0, 0, srcWidth, srcHeight, GraphicsUnit.Pixel);
                        bitmap.Save(saveToPath, ImageFormat.Jpeg);
                    }
                }
            }

            return true;
        }

       
        /// <summary>
        /// 生成缩略图
        /// </summary>
        /// <param name="fromPath">源图路径（物理路径）</param>
        /// <param name="saveToPath">缩略图路径（物理路径）</param>
        /// <param name="width">缩略图宽度</param>
        /// <param name="height">缩略图高度</param>
        /// <param name="mode">生成缩略图的方式</param>  
        public static void MakeThumbnail(string fromPath, string saveToPath, int width, int height, ThumbOp mode)
        {
            Image originalImage = Image.FromFile(fromPath);

            int towidth = width;
            int toheight = height;

            int x = 0;
            int y = 0;
            int ow = originalImage.Width;
            int oh = originalImage.Height;

            switch (mode)
            {
                case ThumbOp.HW:
                    break;
                case ThumbOp.W:        
                    toheight = originalImage.Height * width / originalImage.Width;
                    break;
                case ThumbOp.H:
                    towidth = originalImage.Width * height / originalImage.Height;

                    break;
                case ThumbOp.Cut:      
                    if ((double)originalImage.Width / (double)originalImage.Height > (double)towidth / (double)toheight)
                    {
                        oh = originalImage.Height;
                        ow = originalImage.Height * towidth / toheight;
                        y = 0;
                        x = (originalImage.Width - ow) / 2;
                    }
                    else
                    {
                        ow = originalImage.Width;
                        oh = originalImage.Width * height / towidth;
                        x = 0;
                        y = (originalImage.Height - oh) / 2;
                    }
                    break;
                default:
                    break;
            }

            //新建一个bmp图片
            Image bitmap = new System.Drawing.Bitmap(towidth, toheight);

            //新建一个画板
            Graphics g = System.Drawing.Graphics.FromImage(bitmap);

            //设置高质量插值法
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

            //设置高质量,低速度呈现平滑程度
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

            //清空画布并以透明背景色填充
            g.Clear(Color.Transparent);

            //在指定位置并且按指定大小绘制原图片的指定部分
            g.DrawImage(originalImage, new Rectangle(0, 0, towidth, toheight),
                new Rectangle(x, y, ow, oh),
                GraphicsUnit.Pixel);

            try
            {
                //以jpg格式保存缩略图
                bitmap.Save(saveToPath, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            catch (System.Exception e)
            {
                throw e;
            }
            finally
            {
                originalImage.Dispose();
                bitmap.Dispose();
                g.Dispose();
            }
        }

        public enum ThumbOp
        {
            /// <summary>
            /// 指定高宽缩放（可能变形） 
            /// </summary>
            HW = 0,
            /// <summary>
            /// 指定宽，高按比例  
            /// </summary>
            W = 1,
            /// <summary>
            /// 指定高，宽按比例
            /// </summary>
            H = 2,
            /// <summary>
            /// 指定高宽裁减（不变形）     
            /// </summary>
            Cut = 3
        }
    }
}
