import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../config/api';
import { FaUserPlus, FaTimes, FaCheck } from 'react-icons/fa';
import Cropper from 'react-easy-crop';

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}

const CoreTeamForm = ({ member, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    linkedin: '',
    instagram: '',
    order: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        position: member.position || '',
        linkedin: member.linkedin || '',
        instagram: member.instagram || '',
        order: member.order || 0,
      });
      setPreviewUrl(member.profilePhotoPath || '');
    }
  }, [member]);

  const handlePhotoChange = (e) => {
    console.log('📸 File input changed');
    const file = e.target.files[0];
    console.log('📁 Selected file:', file);
    
    if (file) {
      console.log('✅ File is valid, starting FileReader');
      const reader = new FileReader();
      
      reader.onload = () => {
        console.log('📖 FileReader loaded, data URL length:', reader.result?.length);
        setImageToCrop(reader.result);
        setShowCropper(true);
        console.log('🎨 Cropper modal should now be visible');
      };
      
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error);
      };
      
      reader.readAsDataURL(file);
    } else {
      console.log('⚠️ No file selected');
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log('✂️ Crop complete - Area:', croppedArea);
    console.log('📐 Crop pixels:', croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    console.log('💾 Save crop button clicked');
    console.log('🖼️ Image to crop:', imageToCrop?.substring(0, 50) + '...');
    console.log('📏 Cropped area pixels:', croppedAreaPixels);
    
    try {
      console.log('🔄 Starting crop operation...');
      const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      console.log('✅ Cropped blob created:', croppedBlob);
      
      const croppedFile = new File([croppedBlob], 'profile-photo.jpg', {
        type: 'image/jpeg',
      });
      console.log('📦 File object created:', croppedFile);
      
      setProfilePhoto(croppedFile);
      const previewURL = URL.createObjectURL(croppedBlob);
      setPreviewUrl(previewURL);
      console.log('👁️ Preview URL set:', previewURL);
      
      setShowCropper(false);
      setImageToCrop(null);
      setFileInputKey(Date.now());
      console.log('✨ Cropper closed, states reset');
    } catch (error) {
      console.error('❌ Error cropping image:', error);
      setError('Failed to crop image');
    }
  };

  const handleCropCancel = () => {
    console.log('❌ Crop cancelled by user');
    setShowCropper(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setFileInputKey(Date.now());
    console.log('🔄 All crop states reset');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (profilePhoto) {
        formDataToSend.append('profilePhoto', profilePhoto);
      }

      if (member) {
        await axios.put(`/api/admin/coreteam/${member._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('/api/admin/coreteam', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {console.log('🔍 Render - showCropper:', showCropper, 'imageToCrop:', !!imageToCrop)}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]">
          {console.log('🎭 Cropper modal is rendering')}
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Crop Profile Photo</h3>
              <button
                onClick={handleCropCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-96 bg-gray-100 rounded-lg mb-4">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCropCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FaCheck className="mr-2" />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {member ? 'Edit Core Team Member' : 'Add Core Team Member'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter LinkedIn URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Instagram URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter display order"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo (Max Size : 1MB)
              </label>
              <input
                key={fileInputKey}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <FaUserPlus className="mr-2" />
              )}
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default CoreTeamForm; 