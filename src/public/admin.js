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
      $('#gameId').val('');
      $('#gameName').val('');
      $('#gameComment').val('');
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
  $('#game-list').empty();
  let html = ``;
  for (let i in data) {
    html += `<tr>`;
    html += `  <td>${data[i].gameId}</td>`;
    html += `  <td>${data[i].gameName}</td>`;
    html += `  <td>${data[i].gameComment}</td>`;
    html += `  <td><button type="button" onclick="modifyGame(${data[i].gameId});">수정</button></td>`;
    html += `  <td><button type="button" onclick="getTopicList(${data[i].gameId}, '${data[i].gameName}');">보기</button></td>`;
    html += `</tr>`;
  }

  $('#game-list').append(html);
}

function modifyGame(gameId) {
  let game = GAME_LIST.filter((x) => x.gameId === gameId)[0];
  $('#gameId').val(game.gameId);
  $('#gameName').val(game.gameName);
  $('#gameComment').val(game.gameComment);

  $('#gameBTN').text('게임 수정').attr('onclick', 'callModifyGame()');
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
      $('#gameId').val('');
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

function getTopicList(gameId, gameName) {
  $('#game-topic-form')[0].reset();
  $('#topicBTN').text('주제 추가').attr('onclick', 'addTopic()');
  $('#game-topic-title').text('게임 [' + gameName + '] 주제 목록');
  $('#gameTopicId').val(gameId);
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
  $('#topic-list').empty();
  let html = ``;
  for (let i in data) {
    html += `<tr>`;
    html += `  <td>${data[i].topicId}</td>`;
    html += `  <td>${data[i].topicName}</td>`;
    html += `  <td>${data[i].onBoard}</td>`;
    html += `  <td><button type="button" onclick="modifyTopic(${data[i].topicId});">수정</button></td>`;
    html += `  <td><button type="button" onclick="getTopicDataList(${data[i].topicId}, '${data[i].topicName}');">보기</button></td>`;
    html += `</tr>`;
  }

  $('#topic-list').append(html);
  $('#game-topic-div').show();
  $('#topic-data-div').hide();
}

function addTopic() {
  let gameId = $('#gameTopicId').val();
  let topicName = $('#topicName').val();
  let onBoard = $('#onBoard').val();

  $.ajax({
    url: '/api/topic',
    method: 'POST',
    data: JSON.stringify({
      gameId: Number(gameId),
      topicName: topicName,
      topicImg: '이미지',
      onBoard: onBoard,
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      $('#topicId').val('');
      $('#topicName').val('');
      $('#onBoard').val('');
      generateTopicList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function modifyTopic(topicId) {
  let topic = TOPIC_LIST.filter((x) => x.topicId === topicId)[0];
  $('#topicName').val(topic.topicName);
  $('#onBoard').val(topic.onBoard);
  $('#topicId').val(topic.topicId);
  $('#topicBTN').text('주제 수정').attr('onclick', 'callModifyTopic()');
}

function callModifyTopic() {
  let gameId = $('#gameTopicId').val();
  let topicId = $('#topicId').val();
  let topicName = $('#topicName').val();
  let onBoard = $('#onBoard').val();

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
      $('#topicId').val('');
      $('#topicName').val('');
      $('#onBoard').val('');
      $('#topicBTN').text('주제 추가').attr('onclick', 'addTopic()');
      generateTopicList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

let TOPIC_DATA_LIST = [];

function getTopicDataList(topicId, topicName) {
  $('#game-topic-form')[0].reset();
  $('#topic-data-form')[0].reset();
  $('#topic-dataBTN').text('단어 추가').attr('onclick', 'addTopicData()');
  $('#topic-data-title').text('주제 [' + topicName + '] 단어 목록');
  $('#topicData-topicId').val(topicId);
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
  $('#topic-data-list').empty();
  let html = ``;
  for (let i in data) {
    html += `<tr>`;
    html += `  <td>${data[i].topicDataId}</td>`;
    html += `  <td>${data[i].topicDataName}</td>`;
    html += `  <td>${data[i].topicDataLevel}</td>`;
    html += `  <td><button type="button" onclick="modifyTopicData(${data[i].topicDataId});">수정</button></td>`;
    html += `  <td><button type="button" onclick="deleteTopicData(${data[i].topicDataId});">삭제</button></td>`;
    html += `</tr>`;
  }

  $('#topic-data-list').append(html);
  $('#topic-data-div').show();
}

function addTopicData() {
  let topicId = $('#topicData-topicId').val();
  let topicDataName = $('#topicDataName').val();
  let topicDataLevel = $('#topicDataLevel').val();

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
      $('#topicDataId').val('');
      $('#topicDataName').val('');
      $('#topicDataLevel').val('');
      generateTopicDataList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function modifyTopicData(topicDataId) {
  let topicData = TOPIC_DATA_LIST.filter(
    (x) => x.topicDataId === topicDataId,
  )[0];
  $('#topicDataName').val(topicData.topicDataName);
  $('#topicDataLevel').val(topicData.topicDataLevel);
  $('#topicDataId').val(topicData.topicDataId);
  $('#topic-dataBTN')
    .text('단어 수정')
    .attr('onclick', 'callModifyTopicData()');
}

function callModifyTopicData() {
  let topicId = $('#topicData-topicId').val();
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
      console.log(response);
      $('#topicDataId').val('');
      $('#topicDataName').val('');
      $('#topicDataLevel').val('');
      $('#topic-dataBTN').text('단어 추가').attr('onclick', 'addTopicData()');
      generateTopicDataList(response.data);
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}

function deleteTopicData(topicDataId) {
  if (confirm('정말 삭제하시겠습니까?')) {
    $.ajax({
      url:
        '/api/topic-data/' +
        Number($('#topicData-topicId').val()) +
        '/' +
        Number(topicDataId),
      method: 'DELETE',
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
}

function test11() {
  let file = $('#excel-upload')[0].files[0];
  let formData = new FormData();
  formData.append('file', file);

  let topicId = Number($('#topicData-topicId').val());
  $.ajax({
    url: '/api/view/test/' + topicId,
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
        },
        error: function (response) {
          console.log('실패');
          console.log(response);
        },
      });
    },
    error: function (e) {
      console.log(response);
    },
  });
}
