import React, {Component} from 'react'
// import { withRouter } from 'next/router'
import axios from "axios";
import ApiURL from "../../services/ApiURL";
import { withAuthSync } from '../../utils/auth'
import { Movie } from "../../components/templates/Movie";

axios.defaults.withCredentials = true;

class MoviePage extends Component {
  state = {
    movie: [],
    movieTorrent: []
  };

  static async getInitialProps({req, query: { id }}) {
    // const responseDescription = await axios.get(`${ApiURL.movies}/${id}`);
    // const responseTorrent = await axios.get(`${ApiURL.movies}/${id}/torrents`);
    //
    // const res = responseDescription.data;
    // const resTorrent = responseTorrent.data;

    return {
      movieId: id,
      movie: {
        "title": "Dragonheart 3: The Sorcerer's Curse",
        "imdb_id": "tt3829170",
        "release_date": "2015-02-24",
        "rating": 5,
        "runtime": 97,
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 14,
            "name": "Fantasy"
          }
        ],
        "overview": "When aspiring knight Gareth goes in search of a fallen comet rumored to contain gold, he is shocked to instead find the dragon Drago. After Drago saves Gareth's life the two become intricately bonded, and must work together to defeat an evil sorcerer and stop his reign of terror. Along the way, Gareth learns the true meaning of being a knight in this fantasy action-adventure for the ages.",
        "yt_trailer_id": "ngLwnXEJCpA",
        "fanart_image": "https://image.tmdb.org/t/p/original/1S2y4Tj8UwH4g4kIj29liL2XwxM.jpg",
        "poster_image": "https://image.tmdb.org/t/p/original/weZV8fBcCMDvU5PIQ19w4gPOChD.jpg",
        "played": true,
        "similar": [
          {
            "title": "DragonHeart",
            "release_date": "1996-05-31",
            "rating": 6.5,
            "overview": "In an ancient time when majestic fire-breathers soared through the skies, a knight named Bowen comes face to face and heart to heart with the last dragon on Earth, Draco. Taking up arms to suppress a tyrant king, Bowen soon realizes his task will be harder than he'd imagined: If he kills the king, Draco will die as well.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/1VWsgfwm3cJ4vZnKEWxOj9cv7q.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/5bqI54aIyPDzPKkScwJprzbAsIi.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Excalibur",
            "release_date": "1981-04-10",
            "rating": 7,
            "overview": "A surreal adaptation of Sir Thomas Malory's \"Le Morte d'Arthur\", chronicling Arthur Pendragon's conception, his rise to the throne, the search by his Knights of the Round Table for the Holy Grail, and ultimately his death.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/9IbRRZbQSwFdu026I8GkfrzRRNY.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/j8UmbdA1TrIVY4FANymwBSmUuCH.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Robin Hood",
            "release_date": "2010-05-12",
            "rating": 6.3,
            "overview": "When soldier Robin happens upon the dying Robert of Loxley, he promises to return the man's sword to his family in Nottingham. There, he assumes Robert's identity; romances his widow, Marion; and draws the ire of the town's sheriff and King John's henchman, Godfrey.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/avhEibZxIr8NzHQFBjw3FjLjN7u.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/4gH0vhyOcl7QV3t81653CpWjEB6.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Warcraft",
            "release_date": "2016-05-25",
            "rating": 6.3,
            "overview": "The peaceful realm of Azeroth stands on the brink of war as its civilization faces a fearsome race of invaders: orc warriors fleeing their dying home to colonize another. As a portal opens to connect the two worlds, one army faces destruction and the other faces extinction. From opposing sides, two heroes are set on a collision course that will decide the fate of their family, their people, and their home.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/5SX2rgKXZ7NVmAJR5z5LprqSXKa.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/ckrTPz6FZ35L5ybjqvkLWzzSLO7.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Army of Darkness",
            "release_date": "1992-10-09",
            "rating": 7.3,
            "overview": "A man is accidentally transported to 1300 A.D., where he must battle an army of the dead and retrieve the Necronomicon so he can return home.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/5RPXs9g0sZ9Woo4pNLxdXdge7tc.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/2eZKDIwLNnySbwqQtAaUz0kYDIL.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "The Sorcerer's Apprentice",
            "release_date": "2010-07-13",
            "rating": 6,
            "overview": "Balthazar Blake is a master sorcerer in modern-day Manhattan trying to defend the city from his arch-nemesis, Maxim Horvath. Balthazar can't do it alone, so he recruits Dave Stutler, a seemingly average guy who demonstrates hidden potential, as his reluctant protégé. The sorcerer gives his unwilling accomplice a crash course in the art and science of magic, and together, these unlikely partners work to stop the forces of darkness.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/v0o9M1us65w1kDQp8Q6KnB5a11s.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/ZNSrRpdJ6FjMy4Iu6JpRTJ5Q87.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "The Hobbit: The Desolation of Smaug",
            "release_date": "2013-12-11",
            "rating": 7.6,
            "overview": "The Dwarves, Bilbo and Gandalf have successfully escaped the Misty Mountains, and Bilbo has gained the One Ring. They all continue their journey to get their gold back from the Dragon, Smaug.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/hyR7Fs6Tepgu3yCQGtgO4Ilz9tY.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/gQCiuxGsfiXH1su6lp9n0nd0UeH.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Harry Potter and the Philosopher's Stone",
            "release_date": "2001-11-16",
            "rating": 7.8,
            "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/dCtFvscYcXQKTNvyyaQr2g2UacJ.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Conan the Barbarian",
            "release_date": "2011-08-17",
            "rating": 5.2,
            "overview": "A quest that begins as a personal vendetta for the fierce Cimmerian warrior soon turns into an epic battle against hulking rivals, horrific monsters, and impossible odds, as Conan (Jason Momoa) realizes he is the only hope of saving the great nations of Hyboria from an encroaching reign of supernatural evil.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/381rd4LVvy6AkSB9tqHNu81ftyR.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/fQ0lcaOpn2WozSnL5hfAhH6tYOA.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Sleeping Beauty",
            "release_date": "1959-01-28",
            "rating": 6.9,
            "overview": "A beautiful princess born in a faraway kingdom is destined by a terrible curse to prick her finger on the spindle of a spinning wheel and fall into a deep sleep that can only be awakened by true love's first kiss. Determined to protect her, her parents ask three fairies to raise her in hiding. But the evil Maleficent is just as determined to seal the princess's fate.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/oHZIobyIG0YzWntyPCTSJDOk9qB.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/iFJGafuB2f2IJWG2EmdtUpgfAn6.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Harry Potter and the Half-Blood Prince",
            "release_date": "2009-07-07",
            "rating": 7.6,
            "overview": "As Harry begins his sixth year at Hogwarts, he discovers an old book marked as 'Property of the Half-Blood Prince', and begins to learn more about Lord Voldemort's dark past.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/kRyojLYtWPsBKfDhphhhl1FdM5a.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/bFXys2nhALwDvpkF3dP3Vvdfn8b.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "The Kid Who Would Be King",
            "release_date": "2019-01-16",
            "rating": 6,
            "overview": "Old-school magic meets the modern world when young Alex stumbles upon the mythical sword Excalibur. He soon unites his friends and enemies, and they become knights who join forces with the legendary wizard Merlin. Together, they must save mankind from the wicked enchantress Morgana and her army of supernatural warriors.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/jmbgxBd86MshzQQvv5laKvOKoMm.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/kBuvLX6zynQP0sjyqbXV4jNaZ4E.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Conan the Destroyer",
            "release_date": "1984-06-29",
            "rating": 6,
            "overview": "Based on a character created by Robert E. Howard, this fast-paced, occasionally humorous sequel to Conan the Barbarian features the hero (Arnold Schwarzenegger) as he is commissioned by the evil queen Taramis (Sarah Douglas) to safely escort a teen princess (Olivia D'Abo) and her powerful bodyguard (Wilt Chamberlain) to a far away castle to retrieve the magic Horn of Dagon. Unknown to Conan, the queen plans to sacrifice the princess when she returns and inherit her kingdom after the bodyguard kills Conan. The queen's plans fail to take into consideration Conan's strength and cunning and the abilities of his sidekicks: the eccentric wizard Akiro (Mako), the wild woman Zula (Grace Jones), and the inept Malak (Tracey Walter). Together the hero and his allies must defeat both mortal and supernatural foes in this voyage to sword-and-sorcery land.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/aoHrTDANGQ05ygmLX49OXhTn9jA.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/wLIpIZ0KBopuAsvPBQRSGNjjFVT.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "In the Name of the King: A Dungeon Siege Tale",
            "release_date": "2007-11-29",
            "rating": 4.4,
            "overview": "A man named Farmer sets out to rescue his kidnapped wife and avenge the death of his son -- two acts committed by the Krugs, a race of animal-warriors who are controlled by the evil Gallian.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/u14b6vdFieOm9OXGa49c7n5gmQS.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/bbN1lmDk1PT0GsTFCy179sk5nIF.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Oz the Great and Powerful",
            "release_date": "2013-03-07",
            "rating": 5.8,
            "overview": "Oscar Diggs, a small-time circus illusionist and con-artist, is whisked from Kansas to the Land of Oz where the inhabitants assume he's the great wizard of prophecy, there to save Oz from the clutches of evil.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/4cCQkOv4GfQoTtDzHl54KS3S39N.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/7qzLIcYR7ev7iXngY8NKHBZHwwT.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Season of the Witch",
            "release_date": "2011-01-07",
            "rating": 5.3,
            "overview": "A 14th century Crusader returns with his comrade to a homeland devastated by the Black Plague. The Church commands the two knights to transport a witch to a remote abbey, where monks will perform a ritual in hopes of ending the pestilence.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/dtmmUCOjCtrjzRCtXHXwaBSySjN.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/71XUlmCSJomhBZoXDBBIMxzoLFx.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Black Death",
            "release_date": "2010-06-07",
            "rating": 5.9,
            "overview": "As the plague decimates medieval Europe, rumours circulate of a village immune from the plague. There is talk of a necromancer who leads the village and is able to raise the dead. A fearsome knight joined by a cohort of soldiers and a young monk are charged by the church to investigate. Their journey is filled with danger, but it's upon entering the village that their true horror begins.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/qqmi8TAsSSOdi1pgHYtTA05W7OB.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/gXRERDpyT9s3m2yk6wNmrTWbZfG.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Tales from Earthsea",
            "release_date": "2006-07-29",
            "rating": 6.6,
            "overview": "Something bizarre has come over the land. The kingdom is deteriorating. People are beginning to act strange... What's even more strange is that people are beginning to see dragons, which shouldn't enter the world of humans. Due to all these bizarre events, Ged, a wandering wizard, is investigating the cause. During his journey, he meets Prince Arren, a young distraught teenage boy. While Arren may look like a shy young teen, he has a severe dark side, which grants him strength, hatred, ruthlessness and has no mercy, especially when it comes to protecting Teru. For the witch Kumo this is a perfect opportunity. She can use the boy's \"fears\" against the very one who would help him, Ged.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/7GauLmcFx3tzic3B7DxvRM9Y7cN.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/deB7rfqZXpVxdRinyaCeyhwNPbg.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Your Highness",
            "release_date": "2011-04-08",
            "rating": 5.3,
            "overview": "A fantasy movie about an arrogant, lazy prince and his more heroic brother who must complete a quest in order to save their father's kingdom.",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/MCWdmUJCJFVrbApimgUmORroeS.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/d0P3WWy3Fc3JuORpdkkHhPrhlVc.jpg",
            "played": false,
            "similar": [],
            "cast": []
          },
          {
            "title": "Seventh Son",
            "release_date": "2014-12-12",
            "rating": 5.3,
            "overview": "John Gregory, who is a seventh son of a seventh son and also the local spook, has protected the country from witches, boggarts, ghouls and all manner of things that go bump in the night. However John is not young anymore, and has been seeking an apprentice to carry on his trade. Most have failed to survive. The last hope is a young farmer's son named Thomas Ward. Will he survive the training to become the spook that so many others couldn't?",
            "yt_trailer_id": null,
            "fanart_image": "https://image.tmdb.org/t/p/original/iAX8lPlDEeGHatw79k1LfGLbTi2.jpg",
            "poster_image": "https://image.tmdb.org/t/p/original/zzfzErL8HIyNTRqBHqZAVvEKJ54.jpg",
            "played": false,
            "similar": [],
            "cast": []
          }
        ],
        "cast": [
          {
            "cast_id": 8,
            "character": "Gareth",
            "credit_id": "54e01c00c3a3684551005099",
            "gender": 2,
            "id": 47628,
            "name": "Julian Morris",
            "order": 0,
            "profile_path": "https://image.tmdb.org/t/p/original/oCYcgooUJ8ruEEZjf9iqJ1D6sr2.jpg"
          },
          {
            "cast_id": 43,
            "character": "Rhonu",
            "credit_id": "56be653f9251417359004d05",
            "gender": 1,
            "id": 36672,
            "name": "Tamzin Merchant",
            "order": 1,
            "profile_path": "https://image.tmdb.org/t/p/original/fFqq6Qj96iF3P1KwhN4JhmqRyi0.jpg"
          },
          {
            "cast_id": 2,
            "character": "Lorne",
            "credit_id": "5458b2770e0a261158001984",
            "gender": 0,
            "id": 1281197,
            "name": "Jassa Ahluwalia",
            "order": 2,
            "profile_path": "https://image.tmdb.org/t/p/original/h8mCF3XqbjxoQfr6qsSYhzADvAe.jpg"
          },
          {
            "cast_id": 9,
            "character": "Drago (Voice)",
            "credit_id": "54e01c1fc3a368455100509e",
            "gender": 2,
            "id": 2282,
            "name": "Ben Kingsley",
            "order": 3,
            "profile_path": "https://image.tmdb.org/t/p/original/n0cVP5K2VxlohkAf7LoRwPt4xhu.jpg"
          },
          {
            "cast_id": 4,
            "character": "Traevor",
            "credit_id": "5458b2a50e0a2611620018fd",
            "gender": 0,
            "id": 215460,
            "name": "Jonjo O'Neill",
            "order": 4,
            "profile_path": "https://image.tmdb.org/t/p/original/hwsqMbTPd60JZVON3z3E70YmFON.jpg"
          },
          {
            "cast_id": 6,
            "character": "Potter",
            "credit_id": "5458b2c60e0a26115800198f",
            "gender": 2,
            "id": 8399,
            "name": "Christopher Fairbank",
            "order": 6,
            "profile_path": "https://image.tmdb.org/t/p/original/OtvVhW5zzq2J9eiLC0R1H9sZb2.jpg"
          },
          {
            "cast_id": 7,
            "character": "Begilda",
            "credit_id": "5458b2d7c3a36839ac00169b",
            "gender": 0,
            "id": 1381633,
            "name": "Ozama Oancea",
            "order": 7,
            "profile_path": "https://image.tmdb.org/t/p/originalnull"
          },
          {
            "cast_id": 10,
            "character": "Traevor",
            "credit_id": "54e01cca92514119500048b3",
            "gender": 0,
            "id": 3551,
            "name": "Jake Curran",
            "order": 8,
            "profile_path": "https://image.tmdb.org/t/p/original/h7Jw2wfR1fQoevliz1QA3D3VL0I.jpg"
          },
          {
            "cast_id": 44,
            "character": "Sir Horsa",
            "credit_id": "57dd0b0dc3a368600f000191",
            "gender": 2,
            "id": 109874,
            "name": "Dominic Mafham",
            "order": 9,
            "profile_path": "https://image.tmdb.org/t/p/original/9IgOMf8JOu3m3tz7yHbXCn5nMCJ.jpg"
          }
        ]
      }, //res.movie,
      movieTorrent: {
        "popcorn": [
          {
            "seeds": 65,
            "peers": 11,
            "size": "1.44 GB",
            "url": "magnet:?xt=urn:btih:CD0BC34292D4A5AA9A8B04AB916158C1E9F6BFDD&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337",
            "hash": "CD0BC34292D4A5AA9A8B04AB916158C1E9F6BFDD"
          },
          {
            "seeds": 80,
            "peers": 16,
            "size": "752.69 MB",
            "url": "magnet:?xt=urn:btih:11EE9877451FC353DAC360B64D17BF839E82839E&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337",
            "hash": "11EE9877451FC353DAC360B64D17BF839E82839E"
          }
        ],
        "yts": [
          {
            "seeds": 7,
            "peers": 5,
            "size": "752.69 MB",
            "url": "https://yts.lt/torrent/download/11EE9877451FC353DAC360B64D17BF839E82839E",
            "hash": "11EE9877451FC353DAC360B64D17BF839E82839E"
          },
          {
            "seeds": 7,
            "peers": 4,
            "size": "1.44 GB",
            "url": "https://yts.lt/torrent/download/CD0BC34292D4A5AA9A8B04AB916158C1E9F6BFDD",
            "hash": "CD0BC34292D4A5AA9A8B04AB916158C1E9F6BFDD"
          }
        ]
      } // resTorrent
    }
  }

  render () {
    return (
      <Movie movie={this.props.movie} movieTorrent={this.props.movieTorrent}/>
    )
  }
}

export default withAuthSync(MoviePage);
// export default withRouter(withAuthSync(MoviePage));
