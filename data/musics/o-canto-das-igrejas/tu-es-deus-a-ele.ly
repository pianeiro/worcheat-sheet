\version "2.25.35"

#(set-default-paper-size "a5")

\header {
  title = "Tu és Deus (A Ele)"
  composer = "O Canto das Igrejas"
  copyright = "Como tocado em https://youtu.be/gS0Y4ID0HbY"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
groove = {\improvisationOn \hide Stem  b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key c \major

  \mark "Intro"
  \repeat percent 4 {e16,( f g c)}
  \repeat percent 4 {e,( f g d')}
  \break

  \md
  \repeat volta 2 {
    \repeat percent 4 {d16,( e g c)}
    \repeat percent 4 {e16,( f g d')}
    \repeat percent 4 {d16,( e g c)}
  } \alternative {
    \volta 1 \empty
    \volta 2 {
      <<
        {s2 s8 c8 b a\laissezVibrer}
        \\
        {\improvisationOn b1 \improvisationOff}
        >>
    }
  } \break
  \bar "||" \repeat unfold 4 \empty \break

  \md
  \repeat volta 2 {\repeat unfold 3 \empty}
  \alternative {
    \volta 1 {\empty}
    \volta 2 {
      \improvisationOn
        \hide Stem
          b4 4 b8
        \undo \hide Stem
      \improvisationOff
      c8[ b a\laissezVibrer]
    }
  } \break
  \bar "||"
  \repeat unfold 4 \empty \break
  \break

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }
  \break

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }
  \break

  \md
  \repeat volta 2 \repeat unfold 4 \empty 
  \repeat unfold 6 \empty
  \improvisationOn \repeat unfold 8 {b8 8} \improvisationOff
  \break

  \md
  \repeat unfold 4 \empty
  \improvisationOn \repeat unfold 4 b1 \improvisationOff
  \break

  \md
  \bar "||"
  \improvisationOn b1 b1 \empty b1\fermata \improvisationOff
  \break

}

harmony = \chordmode {
 
  % Intro
  c1 c:sus4.9

  % A
  \repeat volta 2 {c1 c:sus4.9 a:m7.11 }
  \alternative {
    \volta 1 {g2:sus4 g}
    \volta 2 {g1:sus4}
  }
  f1 g c2 c:sus4 c1

  % B
  \repeat volta 2 {c1 c:sus4.9 a:m7.11 }
  \alternative {
    \volta 1 {g1}
    \volta 2 {g1}
  }
  f1 g c2 c:sus4 c1

  % C
  \repeat volta 4 {f1 g c c}

  % D
  \repeat volta 4 {f1 g c c}

  % E
  \repeat volta 2 {f1 g c c}
  f1 g c c f1 g c c

  % F
  f1 g c c f1 g c c

  % G
  f1 g c c

}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \melody
    }
  >>

}