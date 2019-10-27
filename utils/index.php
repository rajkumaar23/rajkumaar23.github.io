<!DOCTYPE html>
<html>
<head>
	<title>Utilities in PHP</title>
	 <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css" />
    <link href="https://fonts.googleapis.com/css?family=Mali" rel="stylesheet">
    <style type="text/css">
    	*{
    		font-family: 'Mali', cursive;
    	}
    </style>
</head>
<body>
  <section class="hero is-info is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Some utility functions I wrote in PHP
      </h1>
    </div>
  </div>
</section>
<section class="section">
     <div class="container">
             <aside class="menu">
              <p class="menu-label">
                Functions Available
              </p>
              <ul class="menu-list">
                    <li> <a href="repoversion.php">Amrita Repository Version</a></li>
                    <li> <a href="btech.php">Curriculum for B.Tech courses provided at Amrita University</a></li>
                    <li> <a href="faq.php">Frequently Asked Questions about Examinations</a></li>
                    <li> <a href="wifi.php">Campus Wifi Status</a></li>
                
              </ul>
              
            </aside>
        </div>
</section>
</body>
<footer class="footer has-background-white"> 
    <div class="content has-text-centered">
    	<p>
    		Content Copyrights - <a href="https://amrita.edu">Amrita Vishwa Vidyapeetham</a>
    	</p>
    <p>
 &copy; Copyright <?php echo date('Y'); ?> <a href="http://rajkumaar.co.in">Rajkumar</a>
    </p>
  </div>
</footer>
</body>
</html>
