import React from 'react'

interface props {
    profilePicture: string,
    handleImageUpload: (event: FileList | null) => void,
    tags: string[],
    setTags: (tags: string[]) => void,
    handleAppendTag: () => void,
    handleCurrentTagInput: (e: any) => void,
    popularTagsArr: string[],
    setCurrentForm: (form: number) => void
}

const AboutMe: React.FC<props> = ({ profilePicture, handleImageUpload, tags, setTags, handleAppendTag, handleCurrentTagInput, popularTagsArr, setCurrentForm }) => {


    return (
        <>
            <h2 className='text-white text-center text-2xl my-2'>Tell Us More About You</h2>
            <p className='text-center mb-1 text-lg'>Profile Picture(Click to upload)</p>
            <div className="flex justify-center w-full">
                <label htmlFor='profile-picture-input' className='cursor-pointer relative h-52 rounded-full aspect-square bg-slate-500 mx-auto'>
                    <img src={profilePicture ? profilePicture : `/user.png`} alt="" className='h-52 aspect-square rounded-full' />
                    <input id='profile-picture-input' type='file' accept='image/*' onChange={(e) => handleImageUpload(e.target.files)} className='hidden' />
                    {/* <p className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black
                                            bg-white bg-opacity-80 rounded text-center'>Click or drag and drop.</p> */}
                </label>
            </div>
            <textarea name="bio" id="bio-input" cols={3}
                placeholder='Bio'
                className="w-full my-2 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 transition ease-in-out duration-150 resize-y"
            ></textarea>
            <div>
                <div className='flex gap-1 justify-around flex-wrap'>
                    {
                        tags.map((tag, index) => <div className='flex rounded bg-slate-700 pl-1 my-0.5 w-max' key={index}>
                            <span># {tag}</span>
                            <button className='aspect-square ' onClick={() => {
                                setTags(tags.filter((selectedTag) => selectedTag != tag))
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-4 w-6 fill-red-600  aspect-square'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </button>
                        </div>)
                    }
                </div>
                <p>Add tags below describing your products</p>
                <div className='flex items-center gap-1'>
                    <input onChange={handleCurrentTagInput} list='tags-input-datalist' type="text" name="tag-input" id="tag-input" className='w-full my-2 bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 transition ease-in-out duration-150 resize-y'/>
                    <datalist id='tags-input-datalist'>
                        {
                            popularTagsArr.map((item, _index) => <option key={_index} value={item} />)
                        }
                    </datalist>
                    <button onClick={handleAppendTag} className='bg-white bg-opacity-15 h-full px-2 py-2 rounded' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 fill-green-600'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className='flex justify-end w-full'>
                <button
                    onClick={() => setCurrentForm(2)}
                    className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 ${!profilePicture ? "opacity-50" : ""}`}
                    type="button"
                    disabled={!profilePicture}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default AboutMe