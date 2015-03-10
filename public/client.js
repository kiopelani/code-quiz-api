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
    .success(function(questionId){
      appendToList([questionId]);
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
    for(var i in questions){
      question = questions[i];
      content = '<a href="/api/v1/questions/'+question+'">'+question+'</a>'+
      ' <a href="#" data-question="'+question+'">X</a>';
      list.push($('<li>', {html: content}));
    }
    $('.question-list').append(list);
  }
});