document.querySelector('.img').addEventListener('click', () => {
  document.querySelector('#imageUpload').click();

  document.querySelector('#imageUpload').addEventListener('change', (event) => {
    const fileName = event.path[0].files[0];
    if (fileName) {
      document.querySelector('#avatarImg').src =
        window.URL.createObjectURL(fileName);
      document.querySelector('#imageUpload').style.pointerEvents = 'none';
      document.querySelector('.saveImg').style.display = 'block';
    }
  });
});

document.querySelector('#cancel').addEventListener('click', () => {
  location.reload();
});
