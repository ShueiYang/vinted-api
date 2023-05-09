require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const { convertToBase64 } = require("../utils/utility");

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


async function uploadUserAvatar (imgFile, userId) {
    try {
        const result = await cloudinary.uploader.upload(convertToBase64(imgFile), {
            folder: `api/vinted-v2/users/${userId}`,
            public_id: "avatar",
        });
        const {url, api_key, ...avatarData } = result;
        return avatarData;
    } catch (err) {
        throw err;
    }
}        


async function uploadOfferPicture (imgFile, userId, offerId, index) {
    try {
        const result = await cloudinary.uploader.upload(convertToBase64(imgFile), {
            folder: `api/vinted-v2/offers/${userId}/${offerId}`,
            public_id: (index && index !== 0) ? `preview${index}` : "preview"
        });
        const {url, api_key, ...pictureData } = result;
        return pictureData;       
    } catch (err) {
        throw err;
    }
}


async function updateUserAvatar (publicId, newFile, userId) {
    try {
        // delete the current current image...
        const oldAvatar = await cloudinary.uploader.destroy(publicId);           
        if(oldAvatar.result === "ok" || oldAvatar.result === "not found") {
            // than i reupload a new one...
            const result = await cloudinary.uploader.upload(convertToBase64(newFile), {
                folder: `api/vinted-v2/users/${userId}`,
                public_id: "avatar",
            });
            const {url, api_key, ...avatarData } = result;
            return avatarData;
        } else {
            throw { status: 500, message: "Cannot update avatar picture try again later" }
        }            
    } catch (err) {
        throw err;
    }
}

async function updateOfferPicture (publicId, newFile, userId, offerId) {
    try {
        const oldPicture = await cloudinary.uploader.destroy(publicId);             
        if(oldPicture.result === "ok" || oldPicture.result === "not found") {
            const result = await cloudinary.uploader.upload(convertToBase64(newFile), {
                folder: `api/vinted-v2/offers/${userId}/${offerId}`,
                public_id: "preview",
            });
            const {url, api_key, ...pictureData } = result;
            return pictureData;
        } else {
            throw { status: 500, message: "Cannot update picture try again later"}
        }            
    } catch (err) {
        throw err;
    }
}

async function deleteAvatar (userId) {
    try {
        // delete image in the specific foler
        await cloudinary.api.delete_resources_by_prefix(
            `api/vinted-v2/users/${userId}`
        );
        // than delete the empty folder...
        await cloudinary.api.delete_folder(
            `api/vinted-v2/users/${userId}`
        )           
    } catch (err) {
        throw err;
    }
}

async function deleteOfferPicture (userId, offerId) {
    try {
        await cloudinary.api.delete_resources_by_prefix(
            `api/vinted-v2/offers/${userId}/${offerId}`
        );
        await cloudinary.api.delete_folder(
            `api/vinted-v2/offers/${userId}/${offerId}`
        )           
    } catch (err) {
        throw err;
    }
}

async function deleteAllUserOffers (userId) {
    try {
        // delete all images in the folder
        await cloudinary.api.delete_resources_by_prefix(
            `api/vinted-v2/offers/${userId}`
        )
        // than delete all empty folder include the userId folder create to contain user offers.
        await cloudinary.api.delete_folder(
            `api/vinted-v2/offers/${userId}`
        )         
    } catch (err) {
        throw err;
    }
}


module.exports = {
    uploadUserAvatar,
    uploadOfferPicture,
    updateUserAvatar,
    updateOfferPicture,
    deleteAvatar,
    deleteOfferPicture,
    deleteAllUserOffers
};