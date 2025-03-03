function imageToBase64(files: File | File[], asDataURL: boolean = true): Promise<string> {
  return new Promise((resolve, reject) => {
    const convertFile = (file: File): Promise<string> => {
      return new Promise((innerResolve, innerReject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const result = event.target?.result;
          if (typeof result === 'string') { 
            innerResolve(asDataURL ? result : result.split(',')[1]); 
          } else {
            innerReject("Failed to read file.");
          }
        };
        reader.onerror = (error) => {
          innerReject(error);
        };
        reader.readAsDataURL(file); 
      });
    };

    if (Array.isArray(files)) {
      convertFile(files[0])
        .then(result => resolve(result))
        .catch(error => reject(error));
    } else {
      convertFile(files)
        .then(result => resolve(result))
        .catch(error => reject(error));
    }
  });
}
export default imageToBase64;

