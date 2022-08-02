const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

const json = JSON.parse(data)

const current_uid = json['uid']
firebase.database().ref('users/' + current_uid).once('value', (snapshot) => {
    const first_name = snapshot.val()['userData']['firstName']
    const last_name = snapshot.val()['userData']['lastName']
    const photo_url = snapshot.val()['userData']['photoURL']
    const email = snapshot.val()['userData']['email']
    const school = snapshot.val()['userData']['school']
    const bio = snapshot.val()['userData']['bio']
    const phone = snapshot.val()['userData']['phone']
    const state = snapshot.val()['userData']['state']
    const grad = snapshot.val()['userData']['grad']

    const price = snapshot.val()['accountData']['price']

    document.getElementById("profile_pic").src = photo_url
    document.getElementById("display_name").innerText = first_name + ' ' + last_name
    document.getElementById("display_email").innerText = email
    document.getElementById("first_name").value = first_name
    document.getElementById("last_name").value = last_name
    document.getElementById("phone_number").value = phone
    document.getElementById("email").value = email
    document.getElementById("state").value = state
    document.getElementById("school").value = school
    document.getElementById("bio").value = bio
    document.getElementById("grad").value = grad

    document.getElementById("price").value = price
});

let fieldIDs = ["first_name", "last_name", "email", "school", "grad", "bio", "phone_number", 'price']

function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}


let arrSelected = [];
$('#selector').on('change', function () {
    const selected = $(this).find("option:selected");
    arrSelected = [];

    selected.each((idx, val) => {
        arrSelected.push(val.value);
    });

    console.log(arrSelected)
});


function saveNewData() {
    const first_name = valueOf("first_name")
    const last_name = valueOf("last_name")
    const email = valueOf("email")
    const school = valueOf("school")
    const grad = valueOf("grad")
    const bio = valueOf("bio")
    const phone = valueOf("phone_number")
    const state = valueOf("state")
    const price = valueOf("price")

    if (fieldsFull()) {
        firebase.database().ref('users/' + current_uid).set({
            userData: {
                firstName: first_name,
                lastName: last_name,
                email: email,
                photoURL: json['photoURL'],
                school: school,
                grad: grad,
                bio: bio,
                phone: phone,
                state: state,
            },
            accountData: {
                accountType: 'tutor',
                subjects: arrSelected,
                price: price
            },

        });
    }
}

function valueOf(elementID) {
    try {
        if (document.getElementById(elementID).value.length === 0) {
            return document.getElementById(elementID).placeholder
        } else {
            return document.getElementById(elementID).value
        }
    } catch (error) {

    }
}

function fieldsFull() {
    fieldState = true
    fieldIDs.forEach((val, index) => {
        if (document.getElementById(val).value.length === 0) {
            console.log('EMPTY ' + val)
            document.getElementById(val).style.border = 'solid 1px red'
            fieldState = false
        } else {
            document.getElementById(val).style.border = 'solid 1px lightgray'
        }
    });
    return fieldState
}

