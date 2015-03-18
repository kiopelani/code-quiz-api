$(function(){

  $.get('api/v1/questions', appendToList);

  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var questionData = form.serialize();

    $.ajax({
      type: 'POST', url: '/api/v1/questions', data: questionData
    })
    .error(function(){
      console.log("Error with post request");
    })
    .success(function(question){
      //FIX tHIS -- not appending right
      $('.question-list').append('<li><a href="/api/v1/questions/'+question['id']+'">'+question['title']+'</a><a href="#" data-question="'+question['id']+'">X</a></li>');
      form.trigger('reset');
    });
  });

  $('.question-list').on('click', 'a[data-question]', function(event){
    if(!confirm('Are you sure?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE', url: '/api/v1/questions/' + target.data('question')
    }).done(function(){
      target.parents('li').remove();
    });
  });

  function appendToList(questions){
    var list = [];
    var content, question;
    for(var key in questions){
      var question = questions[key];
      content = '<a href="/api/v1/questions/'+question['id']+'">'+question['title']+'</a>'+
      ' <a href="#" data-question="'+question['id']+'">X</a>';
      list.push($('<li>', {html: content}));
    }
    $('.question-list').append(list);
  }
});