if (typeof window !== 'undefined') {
    console.log('we are running on the client')
} else {
    console.log('we are running on the server');
}

if (typeof window !== 'undefined') {
    localStorage.setItem('myCat', 'Tom');
    console.log("okok")
}

