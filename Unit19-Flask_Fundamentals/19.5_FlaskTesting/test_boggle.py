from unittest import TestCase
import app
import boggle


class BoggleGame(TestCase):

    def test_homepage(self):
        with app.app.test_client() as client:
            res = client.get("/")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                "please select the size of the board",
                html,
            )

    def test_game(self):
        with app.app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["record"] = 12
                change_session["playedtimes"] = 7
            res = client.get("/game", query_string={"columns": "5", "lines": "5"})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                '<span id="record">12</span>',
                html,
            )
            self.assertIn(
                '<span id="playedtimes">7</span>',
                html,
            )

    def test_submitWord(self):
        with app.app.test_client() as client:
            # app.boggleGame = boggle.Boggle()
            board = app.boggle_game.make_board(8, 8)
            with client.session_transaction() as change_session:
                change_session["board"] = board
            res = client.post("/word", json={"word": "assessment"})
            json_reply = res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_reply["result"], "not-on-board")

            res = client.post("/word", json={"word": "afffr"})
            json_reply = res.get_json()
            self.assertEqual(json_reply["result"], "not-a-word")

            board = app.boggle_game.make_board(3, 3)
            with client.session_transaction() as change_session:
                change_session["board"] = board
            res = client.post("/word", json={"word": "assessment"})
            json_reply = res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_reply["result"], "not-on-board")

    def test_save_data(self):
        with app.app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["record"] = 5
                change_session["playedtimes"] = 4
            res = client.post("/save", json={"score": "10"})
            json_reply = res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_reply["record"], 10)
            self.assertEqual(json_reply["played-times"], 5)

            res = client.post("/save", json={"score": "8"})
            json_reply = res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_reply["record"], 10)
            self.assertEqual(json_reply["played-times"], 6)
