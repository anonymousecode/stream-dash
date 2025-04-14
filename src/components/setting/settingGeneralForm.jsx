'use client'
import React from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import Footer from '@/components/shared/Footer'
// import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import { FiCamera } from 'react-icons/fi'
import useImageUpload from '@/hooks/useImageUpload'
import PerfectScrollbar from 'react-perfect-scrollbar'
import InputTopLabel from '@/components/shared/InputTopLabel'

const SettingGeneralForm = () => {
    const { handleImageUpload, uploadedImage } = useImageUpload()
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label htmlFor='img' className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded d-inline-block" style={{ marginBottom: "-8px" }}>
                                    <img src={uploadedImage || "/images/logo-abbr.png"} className="upload-pic img-fluid rounded h-100 w-100" alt="img" />
                                    <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                        <i className="camera-icon" aria-hidden="true" ><FiCamera /></i>
                                    </div>
                                    <input className="file-upload" type="file" accept="image/*" id='img' hidden onChange={handleImageUpload} />
                                </label>
                            </div>
                            <InputTopLabel
                                label={"Name"}
                                placeholder={"Name"}
                            />
                            
                            <InputTopLabel
                                label={"Email"}
                                placeholder={""}
                            />
                            
                            <InputTopLabel
                                label={"Phone"}
                                placeholder={""}
                            />
                            <InputTopLabel
                                label={"Address"}
                                placeholder={" Address"}
                            />
                            <InputTopLabel
                                label={"City"}
                                placeholder={"City"}
                            />
                            <InputTopLabel
                                label={"BRC"}
                                placeholder={""}
                            />
                            <InputTopLabel
                                label={"District"}
                                placeholder={""}
                            />
                            <InputTopLabel
                                label={"State"}
                                placeholder={"State"}
                            />
                            
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingGeneralForm