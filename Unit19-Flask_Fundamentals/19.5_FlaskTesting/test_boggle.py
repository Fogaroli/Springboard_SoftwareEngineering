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
            res = client.get("/game", query_string={"columns": "5", "lines": "5"})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)

    def test_submitWord(self):
        with app.app.test_client() as client:
            boggleGame = boggle.Boggle()
            board = boggleGame.make_board(8, 8)
            with client.session_transaction() as change_session:
                change_session["board"] = board
            res = client.post("/word", json={"word": "a"})
            json_reply = res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_reply["result"], "ok")

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
