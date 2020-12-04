// const express = require('express');
// const fs = require('fs');

// const path = require('path');

const students = getStudentData()
const studentCnt = students.length;

var totalScore = 0;

for (var student in students) {
    var score = student.score;
    totalScore += score;
}

var averageScore = totalScore / studentCnt;
var modalScore = 0;
var medianScore = 0;

var data = [averageScore, modalScore, medianScore];

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new myChart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mean', 'Mode', 'Median'],
        datasets: [{
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});