document.querySelector('.img').addEventListener('click', () => {
  document.querySelector('#imageUpload').click();

  document.querySelector('#imageUpload').addEventListener('change', (event) => {
    const fileName = event.path[0].files[0];
    if (fileName) {
      console.log(fileName);
      document.querySelector('#avatarImg').src =
        window.URL.createObjectURL(fileName);
      document.querySelector('#imageUpload').style.pointerEvents = 'none';
      document.querySelector('.saveImg').style.display = 'block';
      //   fs.writeFile(path.resolve(__dirname,`./images/${fileName}`), imageBuffer, () => console.log('image downloaded'));
    }
  });
});
