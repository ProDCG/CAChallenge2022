// TODO change later to get unique users
printUsers('A')

function printUsers(sortingType) {
    document.getElementById("tutor-list").innerHTML = '';
    switch(sortingType) {
        case 'R':
            firebase.database().ref("users").orderByChild("accountData/accountType").equalTo("tutor").on('child_added', (snapshot) => {
                injectTutorData(snapshot)
                console.log(snapshot.val() + '\n')
            });
        case 'A':
            firebase.database().ref("users").orderByChild("accountData/price").on('child_added', (snapshot) => {
                console.log(snapshot.val())
                injectTutorData(snapshot)
            });
            break
        case 'D':
            firebase.database().ref("users").orderByChild("accountData/price").on('child_added', (snapshot) => {
                injectTutorData(snapshot)

            });
            break
    }
}

function injectTutorData(snapshot) {
    console.log(snapshot.key)
    var ReverseArray = [];
    var length = snapshot.length;
    for(var i = length-1;i>=0;i--){
        ReverseArray.push(ActualArray[i]);
    }
    var newElement = document.createElement("tr");
    newElement.innerHTML = '\
        <tr>\
        <td>\
            <div class="widget-26-job-emp-img">\
                <img referrerpolicy="no-referrer" src="' + snapshot.val()['userData']['photoURL'] + '"\
                    alt="Company"/>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-title">\
                <a href="#">' + snapshot.val()['userData']['firstName'] + ' ' + snapshot.val()['userData']['lastName'] + '</a>\
                <p class="m-0"><a href="#" class="employer-name">MAJOR</a>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-info">\
                <p class="type m-0">' + snapshot.val()['userData']['school'] + '</p>\
                <p class="text-muted m-0">in <span class="location">LOCATION OF MAJOR</span>\
                </p>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-salary">PRICE OF TUTOR SESSION</div>\
        </td>\
        <td>\
            <div class="widget-26-job-category bg-soft-warning">\
                <i class="indicator bg-warning"></i>\
                <span>SUBJECT</span>\
            </div>\
        </td>\
        \<td>\
            <div class="widget-26-see-profile">\
                 <button type="button" class="form-control"\
                        data-toggle="modal"\
                        data-target="#exampleModalCenter' + snapshot.key + '">\
                                                                                See Profile\
                                                                           </button>\
                                                                       </div>\
                                                                    </td>\
    </tr>\
    ';
    document.getElementById("tutor-list").appendChild(newElement);

    var element = document.createElement("div");
    element.innerHTML = '<div class="modal fade" id="exampleModalCenter' + snapshot.key + '" tabIndex="-1" role="dialog"\
                                    aria-labelledby="exampleModalCenterTitle"\
                                    aria-hidden="true">\
            <div class="modal-dialog modal-lg" role="document" style="top: 25%">\
                <div class="container mt-5">\
                    <div class="row d-flex justify-content-center">\
                        <div class="col-md-7">\
                            <div class="card p-3 py-4">\
                                <div class="text-center">\
                                    <img referrerPolicy="no-referrer" src="' + snapshot.val()['userData']['photoURL'] + '" width="100"\
                                         class="rounded-circle">\
                                </div>\
\
                                <div class="text-center mt-3">\
                                    <h5 class="mt-2 mb-0" style="color: black">' + snapshot.val()['userData']['firstName'] + ' ' + snapshot.val()['userData']['lastName'] + '</h5>\
                                    <span style="color: darkgrey">' + snapshot.val()['userData']['school'] + '</span>\
    \
                                    <div class="px-4 mt-1">\
                                        <p class="fonts">' + snapshot.val()['userData']['bio'] + '</p>\
                                    </div>\
    \
                                    <div class="buttons">\
                                        <button class="btn btn-primary px-4 ms-3">Contact</button>\
                                        <button class="btn btn-secondary" data-dismiss="modal">Close</button>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ';

    document.body.appendChild(element)
}