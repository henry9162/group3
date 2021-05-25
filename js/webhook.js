$(document).ready(function () {
    $('.loader').hide();
    $('#success').hide();
    
    $('#submitBtn').click(function(){
        savePost();
    })
});

function savePost(){
    if($('#accountNumberInput1').val() != '' && $('#amountInput1').val() != '' && $('#referenceInput1').val() != ''){
        $('#submitBtn').hide()
        $('.loader').show()
        
        let data = {
            AccountNumber: $('#accountNumberInput1').val(),
            TransactionAmount: $('#amountInput1').val(),
            TransactionReference: $('#referenceInput1').val(),
            RequestId: "dwerwerew",
            TransactionDate: "2021-04-21 10:00:00",
            TransactionSequence: "125712906",
            TransactionIndicator: "C",
            Remarks: "Transfer"
        }

        fetch("https://xdwfw9kou5.execute-api.eu-west-2.amazonaws.com/dev/payment/BankTransfer/VirtualTransferHook", {
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