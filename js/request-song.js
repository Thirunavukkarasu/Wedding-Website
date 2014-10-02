$(document).ready(function() {

    $('#registrationForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_ ]+$/,
                        message: 'The username can only consist of alphabetical and number'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            album_name: {
                message: 'The album name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The album name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: 'The album name must be more than 4 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_ ]+$/,
                        message: 'The album name can only consist of alphabetical and number'
                    }
                }
            },
            song_name: {
                message: 'The song name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The song name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 40,
                        message: 'The song name must be more than 6 and less than 40 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_ ]+$/,
                        message: 'The song name can only consist of alphabetical and number'
                    }
                }
            }			
        }
    });
    getAllSongs();
});
$( "#submit" ).click(function() {
            var name = $("input#name").val();
            var email = $("input#email").val();
            var album_name = $("input#album_name").val();
            var song_name = $("input#song_name").val();
            console.log(name+" "+email+" "+album_name+" "+song_name);
            $.ajax({
                url: "./php/request-song.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    album_name: album_name,
                    song_name: song_name,
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-success').append("<strong>Song got successfully added to list! </strong>");
                    $('#success > .alert-success').append('</div>');
                    //clear all fields
                    $('#registrationForm').trigger("reset");
                    getAllSongs();
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + " it seems like that issue with the storage server ...</strong> Could you please email me directly to <a href='mailto:skanjanadevi@gmail.com?Subject=Request_a_song'>skanjanadevi@gmail.com</a> ? Sorry for the inconvenience!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#registrationForm').trigger("reset");
                }
            });
});

function getAllSongs()
{
   	$.ajax({
                url: "./php/select_table.php",
                type: "POST",
                cache: false,
                success: function(data) {
                	var jsonData=jQuery.parseJSON($.trim(data));
                	var content="<table class=\"table table-bordered table-condensed\"><tr class=\"success\"><th>Name</th><th>Email ID</th><th>Album Name</th><th>Song Name</th>";
			$.each(jsonData,function(i){
			      content+="<tr class=\"warning\"><td>"+jsonData[i].Name+"</td><td>"+jsonData[i].Email_ID+"</td><td>"+jsonData[i].Album_Name+"</td><td>"+jsonData[i].Song_Name+"</td></tr>";
			});
			content+="</table>";
			$('#request_song_table').empty();
                        $('#request_song_table').html(content);
                },
                error: function() {
                	console.log("Failure");
                }
            });
}