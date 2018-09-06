<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{title}}</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="robots" content="nofollow" />
  <link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
  <style>
    body {
      margin: 30px;
    }

    a {
      display: block;
      font-size: 20px;
    }
  </style>
</head>

<body>
  {{#each files}}
  <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
  {{/each}}
</body>

</html>
