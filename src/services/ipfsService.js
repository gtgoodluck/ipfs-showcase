// src/services/ipfsService.js
import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY;

export const uploadToPinata = async (file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add metadata
    const pinataMetadata = JSON.stringify({
      name: metadata.title || file.name,
      keyvalues: {
        description: metadata.description || '',
        storyContext: metadata.storyContext || '',
        uploadDate: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size
      }
    });
    
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    
    formData.append('pinataOptions', pinataOptions);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
    };
    
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return {
      success: false,
      error: error.response?.data?.error || error.message
    };
  }
};

// Get file info from IPFS hash
export const getFileInfo = async (ipfsHash) => {
  try {
    const response = await axios.get(
      `https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${ipfsHash}`,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};