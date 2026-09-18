\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Yahweh"
  %subtitle= ""
  composer= "One Service"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/U1Oi-IWV43Q"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key ees \minor
  \mark "Intro"
  \repeat percent 3 {bes''8 bes, ees bes f' bes, ges' bes, aes' bes, ges' bes, f' bes, ees bes}
  bes'8 bes, ees bes f' bes, ges' bes, f'1
  \break

  \md \bar "||"
  \improvisationOn b,1~1~1~2. \improvisationOff
  ees,8 f
  
  \repeat segno 2 {
    \break 
    ges2 ees aes2. bes4 g1~2.
    ees8 f \break ges2 ees aes2. bes4 g2. 
    bes,16 c ees f g8. ees16~16 g8 ges16~8. des'16~16 ces bes8
    \break

    \md \bar "||"
    \improvisationOn b8. b16~2. b8. b16~2. \improvisationOff
    ges16 aes bes8 bes ges16 aes bes8 aes16 ges f8 ges~ges8. aes16~8 bes~8.
    \improvisationOn b16~4 \improvisationOff
    
    \alternative {
      \volta 1 {
        \break
        \bar "||"
        \improvisationOn b8. b16~2. b8. b16~2. \improvisationOff
        ges16 aes bes8 bes ges16 aes bes8 aes16 ges f8 ges~ges8. aes16~8 bes~4 ees,8 f
        \break

        \md \bar "||"
        ges2 ees aes2. bes4 d,2 8. ees16~16 f8 ees16~8. bes16~8. ces16~4 ees8 f
        ges2 ees aes2. bes4 ges1
        bes,16 ces ges'8 r16 c,16 des aes'
        \improvisationOn r8. b16~16 b8 b16 \improvisationOff
        \break

        \md \bar "||"
        \repeat percent 3 \repeat unfold 4 ees4\staccato
        \improvisationOn
          \hide Stem
            b4 4 4
          \undo \hide Stem
        \improvisationOff
        ees,8 f
      }
    }
  }
  \break 

  \sectionLabel "Coda" \bar "||"
  \improvisationOn b8. b16~2. \improvisationOff
  f8. ges16~16 bes8 c16~16 des8
  \improvisationOn b16~4 \improvisationOff
  \empty \empty

  \repeat unfold 2 {
    \improvisationOn
      \hide Stem
        b4 4 4 \undo \hide Stem \appoggiatura b16 \hide Stem4
      \undo \hide Stem
    \improvisationOff
  }
  \empty \empty
  \repeat unfold 3 \empty
  \improvisationOn
    \hide Stem
      b4 4 4
    \undo \hide Stem
  \improvisationOff
  ees,8 f
  \break

  \md \bar "||"
  ges2 ees aes2. bes4 g1~2.
  ees'8 f ges2 ees aes2.
  \improvisationOn
    b,4
  \improvisationOff
  \break

  \md \bar "||"

  \improvisationOn
    b1~1~1~1
  \improvisationOff
  \break

  \md \bar "||"
  \improvisationOn
    b2. r4 r2. b8 8 r1 r2. b8 8
    b4. 8 2 8. 8. 8 2
    r2 b2 8. 8. 8 4 8 8
  \improvisationOff
  \repeat unfold 4 \empty
  \repeat percent 2 {\empty \empty}
  \break

  \md \bar "||"
  \repeat percent 4 {
    g4. aes8 bes[ ees,] r4
    \improvisationOn
      b'16 8 16~8 8 8. 16~8 8
    \improvisationOff
  }
  \break

  \md \bar "||"
  ees4 8. bes16 des ees8. 4 r1 
  ees4 8. bes16 des ees8. 4
  \improvisationOn
    r2 r16 b8. r16 b8.
  \improvisationOff
  ees4 8. bes16 des ees8. 4 r1 
  ees4 8. bes16 des ees8. 4
  \improvisationOn
    r2 b4 4
  \improvisationOff
  \break
  
  \md \bar "||"
  \empty \empty
  r8. g16~16 bes8 d16~8. ees16~16 f8 ees16~8. d16~16 bes8.
  \improvisationOn
    \hide Stem
      b4 4
    \undo \hide Stem
    b4. 8 2 2 r2 r1\fermata
    \break

    \md \bar "||"
    b1\fermata b1\fermata bes2.\fermata 
  \improvisationOff
  aes8 bes ces1\fermata
  \improvisationOn
    \time 2/4 b8 8 4 \bar "|."
  \improvisationOff

}

harmony = \chordmode {

  % Intro
  ees1:m7~1~1~1~1~1~1 bes:7

  % A
  ees1:m7~1~1~1

  % segno
  ces1:maj7 des ees/g ees
  ces1:maj7 des ees/g ees4. c8:7.5-.9~2

  % B
  ces8.:maj aes16:m7~2. g8.:sus bes16:sus~2.

  % Coda from
  ces2.:maj7 des8 ees8:m7~8. des8./f ges4~16 ges4/bes~16 

  ces8.:maj aes16:m7~2. g8.:sus bes16:sus~2.
  ces2.:maj7 des8 ees8:m7~8. des8./f ges8~2 

  % C
  ces2:maj7 aes:m7 des1/f g2.../b c16:m7~4.. des16:m9~2
  ces2:maj7 aes:m7 des1/f ees1:5~8
  aes4:m9 bes4:m9 des4:5~8

  % D
  ees1:5~1~1~1

  % Coda to
  ces8.:maj aes16:m7~2. c2:dim7~8. des16:maj7.9-~4 ees\breve:5
  ces2:maj7~8. aes16:m7~4 des2/f~8. des16~4 ees\breve:5
  des1:sus bes:sus ees\breve:m7

  % E
  ces1:maj7 des/f ees/g ees
  ces2:maj7 aes:m7 ees2./g des4:5

  %F
  ees1:m7~1~1~1

  % G
  ees1:5~1~1~1
  c4.:sus bes8:sus aes2:sus bes8.:sus bes:sus aes8:sus g2:sus
  s2 aes2:sus bes8.:sus bes:sus aes8:sus g4:sus ees:5
  
  ees1:5~1~1~1
  \repeat percent 2 {ees2:m7  ees:m7.13- des:maj7/ees bes:m7/ees}

  %H
  \repeat percent 4 {
    r1 des4./ees ees8 des2:maj/ees
  }

  % J
  r1*3 r2 r16 bes4:sus des8.:sus
  r1*3 r2 aes4:sus bes:sus

  %K
  ces1:maj7 des ees/g c:m7
  ces4.:maj ges8/bes aes2:m7 des2/f r2 r1\fermata
  ees1:m7\fermata aes1:sus\fermata bes2.:sus\fermata g8 ges8 e1\fermata
  ees2
}

\score {
  <<
    \new ChordNames {
      \set additionalPitchPrefix = #"add"
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      %\tempo "Adagietto" 4 = 64
      \melody
    }
  >>
  \layout{}
  \midi{}
}