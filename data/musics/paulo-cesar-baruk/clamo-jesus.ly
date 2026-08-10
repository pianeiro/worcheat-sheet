\version "2.22.1"

#(set-default-paper-size "a5")

\header {
  title = "Clamo Jesus"
  composer= "Paulo César Baruk e Marsena"
}

empty = {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
accent = {\improvisationOn \hide Stem b4 4 4 \undo \hide Stem 4 \improvisationOff}

coda = {\mark \markup { \musicglyph #"scripts.coda" }}
segno = {\mark \markup {\musicglyph "scripts.segno"}}
md = \mark \default

melody = \relative c'' {

  \improvisationOn b1\laissezVibrer\fermata^"drone" \improvisationOff
  \mark "Intro"
  \bar "||" \repeat unfold 2 {gis2 a b dis4 e} a,2 b a dis4 e
  \break

  \md 
  \repeat volta 2 {
    \repeat unfold 6 \empty
    gis2 a
  } \alternative {
    {b2 dis4 e}
    {b1}
  }
  \break

  \md
  \repeat volta 2 {
    \accent \empty
  } \alternative {
    {\empty \empty}
    {gis2 a b dis4 e}
  }
  \break

  \md 
  \bar "||" \repeat unfold 6 \empty
  gis2 a b1
  \break
  
  \md
  \repeat volta 2 {\accent \empty \empty \empty}
  \break

  \md
  \repeat unfold 8 \empty
  \repeat percent 7 {
    \improvisationOn \repeat percent 4 {b8 8} \improvisationOff
  }
  \improvisationOn \repeat percent 4 {b16 b b b} \improvisationOff
  \break

  \md
  \repeat volta 4 {
    \accent \empty
  } \alternative {
    {\empty \empty}
    {\improvisationOn b1~1 \improvisationOff}
  }
  \break

  \md \repeat unfold 6 \empty

  \md \repeat volta 1 {gis2 a b dis4 e^"on cue"}

  \md
  \repeat unfold 8 \empty \break
  \repeat percent 4 {\improvisationOn b4 4 4 4 \improvisationOff}
  \repeat percent 4 {\repeat percent 4 {\improvisationOn b8 8 \improvisationOff}}
  \repeat percent 2 {\empty \improvisationOn \hide Stem b4 4 \undo \hide Stem 4 4 \improvisationOff}
  \empty^"ritardando ..." \empty \improvisationOn b1\fermata \improvisationOff \bar "|."
}

harmonies = \chordmode { 
  
  e1:9 \breve cis:m7.11 a:9 % intro

  % A
  \repeat volta 2 {
    e2 e:sus e1 cis\breve:m7 a1 fis:m7 e2 e:sus
  } \alternative {
    e1
    e1
  }

  %B
  \repeat volta 2 {
    b2. e4/gis a1
  } \alternative {
    {e2 e:sus4 e1}
    e\breve
  }

  %C
  e2 e:sus e1 cis\breve:m7 a\breve e2 e:sus e1

  %D
  \repeat volta 2 {b2. e4/gis a1 e\breve}

  %E
  \repeat unfold 2 {e2 e:sus4 e1 cis\breve:m7 a e\breve}
  
  %F
  \repeat volta 4 {b2. e4/gis a1} \alternative {
    e\breve
    e\breve
  }

  %G
  e2 e:sus e1 cis\breve:m7 a1 f:m7

  #H
  \repeat volta 1 {e2 e:sus e1}

  %J
  e\breve cis:m7 a e
  e\breve cis:m7 a e
  e1 2 dis4:m7.5- gis:aug7 
  cis1.:m7 b4:m7 e:7
  a1 fis:m7 e
}

\score {
  <<
    \new ChordNames \harmonies
    \new Staff { \key e \major \time 4/4 \tempo "Andante" 4 = 74 \melody }
  >>
}