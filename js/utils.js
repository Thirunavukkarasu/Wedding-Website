	function getTemplate(path, callback) {
        var source;
        var template;
 
        $.ajax({
            url: path,
                success: function(data) {
                    source    = data;
                    template  = _.template(source);    
 
                    //execute the callback if passed
                    if (callback) callback(template);
            }
        });
    }