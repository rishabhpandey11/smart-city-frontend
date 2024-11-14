import React, { useRef, useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

type FormValues = {
  name: string;
  files: File[];
};

export default function FileUpload(): JSX.Element {
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // State to store file URLs

  // Use callback to avoid unnecessary re-renders
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue('files', acceptedFiles);
  }, [setValue]);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.json,.csv',
    multiple: true,
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);

    data.files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);

      // Update the list of uploaded files (assuming the response includes file URLs)
      // This part assumes you want to display local previews of the uploaded files
      setUploadedFiles(data.files.map(file => URL.createObjectURL(file)));

      // Reset the form and file input
      reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadedFiles([]); // Clear the uploaded files list if needed
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ paddingBottom: '30vh' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded shadow" style={{ width: '400px', backgroundColor: '#f8f9fa' }}>
        <MDBInput
          id='formName'
          wrapperClass='mb-4'
          label='Name'
          {...register('name', { required: true })}
        />

        <div
          {...getRootProps()}
          className={`dropzone p-4 mb-4 border rounded ${isDragActive ? 'bg-light' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'center', backgroundColor: '#e9ecef' }}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          <p>{isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files (PDF, JSON, CSV)'}</p>
        </div>

        <MDBBtn type='submit' className='mb-4' block>
          Upload
        </MDBBtn>

        {/* Display uploaded files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h5>Uploaded Files:</h5>
            <ul className="list-unstyled">
              {uploadedFiles.map((fileUrl, index) => (
                <li key={index}>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    File {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
