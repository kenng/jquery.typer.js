<!doctype html>
<html>
<head>
</head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script src="/src/jquery.typer.js"></script>
<body>

  <h1>Hello, World!</h1>
 <!--  <h2 data-typer-targets="Hello,Hi,Hola,Hallo,Haai,Ola,Kaixo,Moni,Aloha,Bonjour,Ciao,Hej">Welcome</h2>

  <h2 data-typer-targets="abcdefgfedcba,afgfa">Welcome</h2> -->

<?php 
  $typerOptions = array(
    'targets' => array(
      'Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> makes smart <br class="br-resp small-only" />& enjoyable<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> digital interfaces.',
      // 'Thibault Jorge<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> lives and works<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> in Paris, France.',
      // 'Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" />finds inspiration <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> in many great things.',
      // 'Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" />deeply enjoys<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> digital photography.'
    ),
  );
?>

  <h2 data-typer-targets='<?php echo json_encode($typerOptions); ?>'></h2>


<!--   <p>
  Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> makes smart <br class="br-resp small-only" />& enjoyable<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> digital interfaces.
  </p>
  <p>
  Thibault Jorge<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> lives and works<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> in Paris, France.
  </p>
  <p>
  Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" />finds inspiration <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> in many great things.
  </p>
  <p>
  Thibault Jorge <br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" />deeply enjoys<br class="br-resp xlarge-only" /><br class="br-resp large-only" /><br class="br-resp small-only" /><br class="br-resp medium-only" /> digital photography.
  </p> -->


  <script>
    $(function () {
      $('[data-typer-targets]').typer();
    });
  </script>
</body>
</html>