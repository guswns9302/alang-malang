$(document).ready(function () {
  getGameList();
});

let GAME_LIST = [];

function getGameList() {
  $.ajax({
    url: '/api/game',
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      generateGameList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function addGame() {
  let gameName = $('#gameName').val();
  let gameComment = $('#gameComment').val();

  $.ajax({
    url: '/api/game',
    method: 'POST',
    data: JSON.stringify({
      gameName: gameName,
      gameComment: gameComment,
      gameImg: '이미지',
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      alert('게임 추가됬다야~');
      modifyGame(0);
      generateGameList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function generateGameList(data) {
  GAME_LIST = data;
  $('#data-game-div').show();
  $('#data-topic-div').hide();
  $('#data-word-div').hide();
  $('#nav-li').empty();
  let selectHtml = ``;
  for (let i in data) {
    selectHtml += `<li><button style="width: 100%" class="secondary" value="${data[i].gameId}" onclick="modifyGame(this.value, this);">${data[i].gameName}</button></li>`;
  }
  $('#nav-li').append(selectHtml);
}

function modifyGame(gameId, btn) {
  $.each($('#nav-li').find('button'), function (idx, value) {
    $(value).removeClass('active');
  });

  if (Number(gameId) === 0) {
    $('#gameId').val('');
    $('#gameName').val('');
    $('#gameComment').val('');
    $('#gameBTN').text('게임 추가').attr('onclick', 'addGame()');
    $('#callTopicBtn').hide();
    return;
  }
  $(btn).addClass('active');
  let game = GAME_LIST.filter((x) => x.gameId === Number(gameId))[0];
  $('#gameId').val(game.gameId);
  $('#gameName').val(game.gameName);
  $('#gameComment').val(game.gameComment);

  $('#gameBTN').text('게임 수정').attr('onclick', 'callModifyGame()');
  $('#callTopicBtn').show();
}

function callModifyGame() {
  let gameId = $('#gameId').val();
  let gameName = $('#gameName').val();
  let gameComment = $('#gameComment').val();

  $.ajax({
    url: '/api/game',
    method: 'PATCH',
    data: JSON.stringify({
      gameId: Number(gameId),
      gameName: gameName,
      gameComment: gameComment,
      gameImg: '이미지',
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      alert('게임 수정됬다야~');
      $('#gameName').val('');
      $('#gameComment').val('');
      $('#gameBTN').text('게임 추가').attr('onclick', 'addGame()');
      generateGameList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

let TOPIC_LIST = [];

function getTopicList() {
  $('#data-game-div').hide();
  let gameId = $('#gameId').val();

  $.ajax({
    url: '/api/topic/' + Number(gameId),
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      generateTopicList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function generateTopicList(data) {
  TOPIC_LIST = data;
  $('#data-game-div').hide();
  $('#data-topic-div').show();
  $('#data-word-div').hide();

  $('#nav-li').empty();
  let selectHtml = `<button style="width: 100%; background-color: deepskyblue;" onclick="getGameList();">${$('#gameName').val()}</button>`;
  for (let i in data) {
    selectHtml += `<li><button style="width: 100%" class="secondary" value="${data[i].topicId}" onclick="modifyTopic(this.value);">${data[i].topicName}</button></li>`;
  }
  $('#nav-li').append(selectHtml);
}

function isBool(date) {
  if (new Date(date) >= new Date()) {
    $('#onBoard').val(true);
  } else {
    $('#onBoard').val(false);
  }
}

function topicImageUpload() {
  $('#topicImageUpload').click();
}

function topicImageSave() {
  let topicImage = $('#topicImageUpload')[0].files[0];
  let formData = new FormData();
  formData.append('file', topicImage);

  $.ajax({
    url: '/api/topic/image/upload',
    method: 'POST',
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    data: formData,
    success: function (response) {
      alert('주제 이미지 업로드 됬다야~');
      console.log(response);
      $('#topicImage').attr('src', response.data);
      $('#topicImage').attr('src', '/img/' + response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function addTopic() {
  let gameId = $('#gameId').val();
  let topicName = $('#topicName').val();
  let onBoard = $('#onBoardDate').val();
  let topicImage = $('#topicImage').attr('src');

  $.ajax({
    url: '/api/topic',
    method: 'POST',
    data: JSON.stringify({
      gameId: Number(gameId),
      topicName: topicName,
      topicImg: topicImage,
      onBoard: onBoard,
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      alert('주제 추가 됬다야~');
      modifyTopic(0);
      generateTopicList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function modifyTopic(topicId) {
  if (Number(topicId) === 0) {
    $('#topicId').val('');
    $('#topicName').val('');
    $('#onBoard').val('');
    $('#onBoardDate').val('');
    $('#topicImage').attr('src', '/img/test.png');
    $('#topicBTN').text('주제 추가').attr('onclick', 'addTopic()');
    $('#callTopicDataBtn').hide();
    return;
  }

  let topic = TOPIC_LIST.filter((x) => x.topicId === Number(topicId))[0];
  $('#topicId').val(topic.topicId);
  $('#topicName').val(topic.topicName);
  $('#onBoard').val(topic.onBoard);
  $('#onBoardDate').val(topic.onBoardDate);
  $('#topicImage').attr('src', topic.topicImg);
  $('#topicBTN').text('주제 수정').attr('onclick', 'callModifyTopic()');
  $('#callTopicDataBtn').show();
}

function callModifyTopic() {
  let gameId = $('#gameId').val();
  let topicId = $('#topicId').val();
  let topicName = $('#topicName').val();
  let onBoard = $('#onBoardDate').val();

  $.ajax({
    url: '/api/topic',
    method: 'PATCH',
    data: JSON.stringify({
      gameId: Number(gameId),
      topicId: Number(topicId),
      topicName: topicName,
      onBoard: onBoard,
      topicImg: '이미지',
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      alert('주제 수정 됬다야~');
      modifyTopic(0);
      generateTopicList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

let TOPIC_DATA_LIST = [];

function getTopicDataList() {
  $('#data-topic-div').hide();

  let topicId = $('#topicId').val();

  $.ajax({
    url: '/api/topic-data/' + Number(topicId),
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      generateTopicDataList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function generateTopicDataList(data) {
  TOPIC_DATA_LIST = data;

  $('#data-game-div').hide();
  $('#data-topic-div').hide();
  $('#data-word-div').show();
  let easy = data.filter((x) => x.topicDataLevel == 'easy');
  let hard = data.filter((x) => x.topicDataLevel == 'hard');

  let idx = easy.length >= hard.length ? easy.length : hard.length;
  $('#topic-data-list').empty();
  let html = ``;
  for (let i = 0; i < idx; i++) {
    let easyName = easy[i] == undefined ? '' : easy[i].topicDataName;
    let hardName = hard[i] == undefined ? '' : hard[i].topicDataName;
    let easyId = easy[i] == undefined ? 0 : easy[i].topicDataId;
    let hardId = hard[i] == undefined ? 0 : hard[i].topicDataId;
    html += `<tr>`;
    html += ` <td data-target="add-word-modal" onclick="openAddWordModal(${easyId})">${easyName}</td>`;
    html += ` <td data-target="add-word-modal" onclick="openAddWordModal(${hardId})">${hardName}</td>`;
    html += `</tr>`;
  }

  $('#topic-data-list').append(html);

  $('#nav-li').empty();
  let selectHtml = `<button style="width: 100%; background-color: deepskyblue;" onclick="getTopicList();">${$('#topicName').val()}</button>`;
  $('#nav-li').append(selectHtml);
}

function openAddWordModal(topicDataId) {
  toggleModal(event);
  if (Number(topicDataId) === 0) {
    $('#topicDataId').val('');
    $('#topicDataName').val('');
    $('#topicDataLevel').val('');
    $('#topic-dataBTN').text('추가').attr('onclick', 'addTopicData()');
    $('#topic-data-delBTN').hide();
    return;
  }

  let topicData = TOPIC_DATA_LIST.filter(
    (x) => x.topicDataId === topicDataId,
  )[0];
  $('#topicDataName').val(topicData.topicDataName);
  $('#topicDataLevel').val(topicData.topicDataLevel);
  $('#topicDataId').val(topicData.topicDataId);
  $('#topic-dataBTN').text('수정').attr('onclick', 'callModifyTopicData()');
  $('#topic-data-delBTN').show();
}

function addTopicData() {
  let e = event;

  let topicId = $('#topicId').val();
  let topicDataName = $('#topicDataName').val();
  let topicDataLevel = $('#topicDataLevel option:selected').val();

  if (topicDataName == '') {
    alert('단어를 입력해달라냥~');
    $('#topicDataName').focus();
    return;
  }
  if (topicDataLevel == '') {
    alert('난이도를 선택해달라냥~');
    $('#topicDataLevel').focus();
    return;
  }

  $.ajax({
    url: '/api/topic-data',
    method: 'POST',
    data: JSON.stringify({
      topicId: Number(topicId),
      topicDataName: topicDataName,
      topicDataLevel: topicDataLevel,
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      generateTopicDataList(response.data);
      alert('새로운 단어가 추가됬다냥~');
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
  toggleModal(e);
}

function callModifyTopicData() {
  let e = event;
  let topicId = $('#topicId').val();
  let topicDataId = $('#topicDataId').val();
  let topicDataName = $('#topicDataName').val();
  let topicDataLevel = $('#topicDataLevel').val();

  $.ajax({
    url: '/api/topic-data',
    method: 'PATCH',
    data: JSON.stringify({
      topicId: Number(topicId),
      topicDataId: Number(topicDataId),
      topicDataName: topicDataName,
      topicDataLevel: topicDataLevel,
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      generateTopicDataList(response.data);
      alert('단어가 수정됬다냥~');
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
  toggleModal(e);
}

function deleteTopicData() {
  let e = event;
  if (confirm('정말 삭제하시겠습니까?')) {
    $.ajax({
      url:
        '/api/topic-data/' +
        Number($('#topicId').val()) +
        '/' +
        Number($('#topicDataId').val()),
      method: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      success: function (response) {
        generateTopicDataList(response.data);
        alert('단어가 삭제됬다냥~');
      },
      error: function (response) {
        console.log('실패');
        console.log(response);
      },
    });
  }
  toggleModal(e);
}

function uploadExcelWord() {
  let file = $('#excel-upload')[0].files[0];
  let formData = new FormData();
  formData.append('file', file);

  let topicId = Number($('#topicId').val());
  $.ajax({
    url: '/api/view/excel/upload/' + topicId,
    type: 'POST',
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    data: formData,
    success: function (response) {
      const newArray = [];
      for (let key in response) {
        const item = response[key];
        if (item.easy != null) {
          newArray.push({
            topicId: topicId,
            topicDataName: item.easy,
            topicDataLevel: 'easy',
          });
        }
        if (item.hard != null) {
          newArray.push({
            topicId: topicId,
            topicDataName: item.hard,
            topicDataLevel: 'hard',
          });
        }
      }

      $.ajax({
        url: '/api/topic-data/excel/' + topicId,
        method: 'POST',
        data: JSON.stringify(newArray),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
          generateTopicDataList(response.data);
          $('#excel-upload-div').empty();
          $('#excel-upload-div').append(
            `<input type="file" id="excel-upload" oninput="test11()">`,
          );
          alert('엑셀 데이터가 추가됬다냥~');
        },
        error: function (response) {
          console.log('실패');
          console.log(response);
        },
      });
    },
    error: function (e) {
      console.log(e);
    },
  });
}
