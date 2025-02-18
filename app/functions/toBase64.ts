/**
 * Converts an image file (or multiple files) to Base64 representation.
 *
 * @param {File | File[]} files - The image file(s) to convert. Can be a single File object or an array of File objects.
 * @param {boolean} [asDataURL=true] - Whether to return a Data URL (including MIME type) or just the Base64 string. Defaults to true.
 * @returns {Promise<string | string[]>} - A Promise that resolves with the Base64 string (or Data URL) if a single file is provided, or an array of Base64 strings (or Data URLs) if multiple files are provided.  Rejects if an error occurs during conversion.
 */
function imageToBase64(files: File | File[], asDataURL: boolean = true): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    const convertFile = (file: File): Promise<string> => {
      return new Promise((innerResolve, innerReject) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const result = event.target?.result;
          if (typeof result === 'string') { // Ensure result is a string
            innerResolve(asDataURL ? result : result.split(',')[1]); // Extract Base64 if asDataURL is false
          } else {
            innerReject("Failed to read file.");
          }
        };

        reader.onerror = (error) => {
          innerReject(error);
        };

        reader.readAsDataURL(file); // Use readAsDataURL for Data URL or readAsBinaryString followed by btoa() for pure Base64
      });
    };


    if (Array.isArray(files)) {
      Promise.all(files.map(convertFile))
        .then(results => resolve(results))
        .catch(error => reject(error));
    } else {
      convertFile(files)
        .then(result => resolve(result))
        .catch(error => reject(error));
    }
  });
}
export default imageToBase64;



// Example usage (handling single or multiple files):
