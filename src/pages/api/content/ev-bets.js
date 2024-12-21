import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const fromDate = req.headers.from;
    const toDate = req.headers.to;

    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/ev-bets/?date_after=${fromDate}&date_before=${toDate}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json(data);
      } else {
        return res.status(apiRes.status).json({ error: "unable to get bet" });
      }
    } catch (err) {
      return res.status(500).json({ error: "unable to get bet" });
    }
  }

  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const { recommendation } = req.body;
    const body = JSON.stringify({
      recommendation: req.body.recommendation,
      notes: req.body.notes,
      game_date: req.body.game_date,
      sport_league: req.body.sport_league,
      bookie: req.body.bookie,
      game_id: req.body.game_id,
      title: req.body.title,
      home_team: req.body.home_team,
      away_team: req.body.away_team,
      win_probability: req.body.win_probability,
      expected_ev_value: req.body.expected_ev_value,
      bet_amount: req.body.bet_amount,
      bet_price: req.body.bet_price,
      true_line_price: req.body.true_line_price,
      bankroll_percentage: req.body.bankroll_percentage,
      bet_payout: req.body.bet_payout,
      outcome: req.body.outcome,
      bet_roi: 0,
      bet_saved_mode: req.body.bet_saved_mode,
    });
    try {
      const apiRes = await fetch(`${API_URL}/content_api/ev-bets/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();
      if (apiRes.status === 201) {
        return res.status(201).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to create bet" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to create or access bets",
      });
    }
  }

  if (req.method === "PATCH") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const { recommendation } = req.body;
    const body = JSON.stringify({
      notes: req.body.notes,
      bet_payout: req.body.payout,
      outcome: req.body.outcome,
    });
    const betId = req.body.betId;
    try {
      const apiRes = await fetch(`${API_URL}/content_api/ev-bets/${betId}/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();
      if (data === {}) {
        return res.status(200).json(data);
      } else {
        return res.status(apiRes.status).json({ error: "unable to patch bet" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to create or access bets",
      });
    }
  }

  if (req.method === "DELETE") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const betID = req.headers.betid;

    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    const apiRes = await fetch(`${API_URL}/content_api/ev-bets/${betID}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    if (apiRes === {}) {
      return res.status(200).json({ deleted: true });
    } else {
      return res.json(apiRes.body);
    }
  }
};
