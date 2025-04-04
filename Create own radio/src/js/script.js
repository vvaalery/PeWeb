document.getElementById('openFormButton').addEventListener('click', function() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('closeFormButton').addEventListener('click', closeForm);
document.getElementById('overlay').addEventListener('click', closeForm);

function closeForm() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!lastName || !gender || !email || !password) {
        alert('Please fill in all required fields.');
        return;
    }

    console.log('Last Name:', lastName);
    console.log('First Name:', firstName);
    console.log('Gender:', gender);
    console.log('Email:', email);
    console.log('Password:', password);

    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = 'You have successfully registered!';
    successMessage.style.display = 'block';

    document.getElementById('dataForm').reset();
});