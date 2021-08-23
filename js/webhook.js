$(document).ready(function () {
    var currenyValue;
    $('#currencyInput').on('click',function() {
        currenyValue = $(this).val();
    });

    $('.loader').hide();
    $('#success').hide();
    
    $('#submitBtn').click(function(){
        savePost(currenyValue);
    });
});

function savePost(currenyValue){
    if($('#accountNumberInput1').val() != '' && $('#amountInput1').val() != '' && $('#referenceInput1').val() != ''){
        $('#submitBtn').hide()
        $('.loader').show()
        
        let data = {
            BeneficiaryAccountNumber: $('#accountNumberInput1').val(),
            TransactionAmount: $('#amountInput1').val(),
            TransactionReference: $('#referenceInput1').val(),
            RequestId: "dwerwerew",
            TransactionDate: "2021-04-21 10:00:00",
            TransactionSequence: "1257846",
            TransactionIndicator: "C",
            Remarks: "Transfer",
            SenderName: "Unwana Uforo",
            SenderAccountNumber: "0051762787",
            BankCode: "058",
            currency: parseInt(currenyValue)
        }

        console.log(data)

        // var encryptedData = encrypt(JSON.stringify(data));
        // console.log(encryptedData);
        // debugger

        fetch("https://test-api.squadinc.co/payment/BankTransfer/VirtualTransferHook", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then(jsonResponse => {
            $('#success').show();

            setTimeout(() => {
                $('#success').hide();
            }, 3000);

            console.log(jsonResponse)
            cleanUp(jsonResponse)
        })
    }
}

function encrypt(payload){
    let publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyFP9D0KDMgszvbpt443hQtJPZNceMmYL/MJ47a9CTC/DUFF4rE27v2u9ZgRI+N8ImSKH3H+E9gEmV4Q5YB0bbJkCPxCRb+TqsmSgv0b7Es/vQcQXs4izLVxMTxUYOd1i51mDuewowYcUZ4p4M+t4fj+zol/FEj2GAnlMk9Z1ansvDx98ANFJP0Ipo/o2OREwk8wMfVGgNIzcLWQoNJRIZdJdehQBfkWgER2pdmSGYUc1bYijPB05OgrAJAvSAjIeMoQlR9aeWkNFUfSS5lw9R8Pn8NSVPjtYZUpVeE+4Nr5jnxw/WYjYtc+RgM3w7aTo/iCQvENLB826nbcSXYbxpQIDAQAB"
    let RSAEncrypt = new JSEncrypt();
        RSAEncrypt.setPublicKey(publicKey);
    let encryptedPayload = RSAEncrypt.encrypt(payload);
    return encryptedPayload;
}

function cleanUp(jsonResponse){
    reset();
}

function reset(){
    $('#accountNumberInput1').val("")
    $('#amountInput1').val("")
    $('#referenceInput1').val("")

    $('.loader').hide()
    $('#submitBtn').show()
}