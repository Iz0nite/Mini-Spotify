<!DOCTYPE html>
<html lang="en">
	<head>
	    <title>Blacksmith Project</title>
	    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.1/howler.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
		<main>
			<div id="container" class="container">
				<div id="searchBar&Albums" class="searchBar&Albums">

					<div class="searchBar">
						<img src="img/glassmagnifiermagnifyingsearchsearchingweb_123111.svg" alt="searchBar logo">
						<input id = "searchBar"  v-model="message" placeholder="Search an Artist" v-on:change="search(message)">
					</div>

					<div class="albumsContainer">
						<p>Résultats de votre recherche</p>
						<div class="allAlbums">
							<div v-if="seen" class="album" id="album1" >
								<div v-on:click="showSounds(albumId,album1)">
									<img :src=urlImage alt="album 1 image" width="175px">
									<p>{{albumTitle}}</p>
									<p>{{albumArtist}}</p>
								</div>
								<ol class="olTrack">
									<sounds-list
											v-for="item in soundsList"
											v-bind:ind="item"
											v-bind:sound="item"
											v-bind:duration="item"
											v-bind:track="item"
											v-bind:key="item.id"
									>
									</sounds-list>
								</ol>
							</div>

							<div v-if="seen" class="album" id="album2">
								<div v-on:click="showSounds(albumId,album2)">
									<img :src=urlImage alt="album 2 image" width="175px">
									<p>{{albumTitle}}</p>
									<p>{{albumArtist}}</p>
								</div>
								<ol class="olTrack">
									<sounds-list
											v-for="item in soundsList"
											v-bind:ind="item"
											v-bind:sound="item"
											v-bind:duration="item"
											v-bind:track="item"
											v-bind:key="item.id"
									>
									</sounds-list>
								</ol>
							</div>

							<div v-if="seen" class="album" id="album3">
								<div v-on:click="showSounds(albumId,album3)">
									<img :src=urlImage alt="album 3 image" width="175px">
									<p>{{albumTitle}}</p>
									<p>{{albumArtist}}</p>
								</div>
								<ol class="olTrack">
									<sounds-list
											v-for="item in soundsList"
											v-bind:ind="item"
											v-bind:sound="item"
											v-bind:duration="item"
											v-bind:track="item"
											v-bind:key="item.id"
									>
									</sounds-list>
								</ol>

							</div>
						</div>
					</div>
				</div>

			</div>
		</main>
		<script src="js/scriptSpotify.js"></script>
	</body>

</html>
