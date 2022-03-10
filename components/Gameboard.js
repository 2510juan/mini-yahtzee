import React, { useState, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const THROWS = 3;
const BONUS = 63;
const HIGHEST_VALUE = 6;
export default function Gameboard() {
  const [diceState, setDiceState] = useState([
    { value: '1', holding: false },
    { value: '2', holding: false },
    { value: '3', holding: false },
    { value: '4', holding: false },
    { value: '5', holding: false },
  ]);
  const [score, setScore] = useState([
    { value: '1', isSet: false, totalScore: 0 },
    { value: '2', isSet: false, totalScore: 0 },
    { value: '3', isSet: false, totalScore: 0 },
    { value: '4', isSet: false, totalScore: 0 },
    { value: '5', isSet: false, totalScore: 0 },
    { value: '6', isSet: false, totalScore: 0 },
  ]);
  const [throwsLeft, setThrowsLeft] = useState(THROWS);
  const [gameState, setGameState] = useState('Initial');
  const [gameStatus, setGameStatus] = useState('Throw dice');
  const sumOfScore = useRef(0);
  const totalScore = score.reduce((totalScore, score) => totalScore + score.totalScore, 0);

  function handleDicePress(index) {
    if(gameState === 'Throwing' || gameState === 'Assigning') {
      const newDiceState = [...diceState];
      newDiceState[index].holding = !newDiceState[index].holding;
      setDiceState(newDiceState);
    };
  };

  function handleScorePress(diceIndex) { 
    if(gameState === 'Initial' || gameState === 'Throwing') {
      setGameStatus('You need to throw dices before assigning score');
    }
    if(gameState === 'Assigning' && score[diceIndex].isSet) {
      setGameStatus((diceIndex + 1) + ' is already added');
    } else {
      if(gameState === 'Assigning') {
        const newScore = score.reduce((newScore, score, index) => {
          const tempScore = { ...score };
          if(index === diceIndex) {
            const newValue = diceState.reduce((newValue, dice) => {
              if(dice.value === diceIndex + 1) {
                newValue += 1;
              };
              return newValue
            }, 0);
            tempScore.isSet = true;
            tempScore.totalScore = newValue * tempScore.value
          }
          newScore.push(tempScore);
          return newScore;
        }, []);
        setScore(newScore);
        sumOfScore.current = newScore.reduce((totalScore, score) => totalScore + score.totalScore, 0)
        const isBonus = sumOfScore.current >= BONUS;
        if(isBonus) {
          if(sumOfScore.current >= BONUS){
            setGameStatus('You won!');
            setGameState('Win')
          } else {
            setGameStatus('You lost!');
            setGameState('GameLost')
          }
        } else {
          if(newScore.every(score => score.isSet)) {
            if(sumOfScore.current >= BONUS){
              setGameStatus('You won!');
              setGameState('Win');
            } else {
              setGameStatus('You lost!');
              setGameState('GameLost')
            }
          } else {
            setGameState('Initial');
            setGameStatus('Throw dice');
            setThrowsLeft(THROWS);
            setDiceState([
              { value: '1', holding: false },
              { value: '2', holding: false },
              { value: '3', holding: false },
              { value: '4', holding: false },
              { value: '5', holding: false },
            ]);
          };
        };
      };
    };
  };

    function throwDice() {
    if(gameState === 'Initial'){
      setThrowsLeft(throwsLeft - 1);
      setGameState('Throwing');
      setGameStatus('Select and throw again');
      setDiceState(diceState.map(dice => {
        if (!dice.holding) {
          return { ...dice, value: Math.floor(Math.random() * HIGHEST_VALUE) + 1 };
        } else {
          return dice;
        };
      }));
    } else if (gameState === 'Throwing'){
      if (throwsLeft > 1) {
        setThrowsLeft(throwsLeft - 1);
        setDiceState(diceState.map(dice => {
          if (!dice.holding) {
            return { ...dice, value: Math.floor(Math.random() * HIGHEST_VALUE) + 1 };
          } else {
            return dice;
          };
        }));
      } else {
        setThrowsLeft(throwsLeft - 1);
        setDiceState(diceState.map(dice => {
          if (!dice.holding) {
            return { ...dice, value: Math.floor(Math.random() * HIGHEST_VALUE) + 1 };
          } else {
            return dice;
          };
        }));
        setGameState('Assigning');
        setGameStatus('Select your point before next throw');
      };
    } else if (gameState === 'Win' || gameState === 'GameLost') {
      setGameState('Initial');
      setGameStatus('Throw dice');
      setThrowsLeft(THROWS);
      setDiceState([
        { value: '1', holding: false },
        { value: '2', holding: false },
        { value: '3', holding: false },
        { value: '4', holding: false },
        { value: '5', holding: false },
      ]);
      setScore([
        { value: '1', isSet: false, totalScore: 0 },
        { value: '2', isSet: false, totalScore: 0 },
        { value: '3', isSet: false, totalScore: 0 },
        { value: '4', isSet: false, totalScore: 0 },
        { value: '5', isSet: false, totalScore: 0 },
        { value: '6', isSet: false, totalScore: 0 },
      ]);
    };
  };
  
  function renderDice(){
    return diceState.map((dice, index) => (
      <Pressable
      key={index}
      onPress={() => handleDicePress(index) }
      >
        <MaterialCommunityIcons
          name={"dice-" + dice.value}
          size={50}
          color={dice.holding ? 'grey' : 'black'}
          />
      </Pressable>
    ));
  };

  function renderScore(){
    return (
      <View style={styles.selection}>
      {score.map((score, index) => (
        <Pressable
          key={'score-' + index}
          onPress={() => handleScorePress(index)}
        >
          <Text style={styles.scoreText}>{score.totalScore}</Text>
          <MaterialCommunityIcons
            key={'number-' + index}
            name={"numeric-" + (index + 1) + "-circle"}
            size={50}
            color={score.isSet ? 'grey' : 'black'}
          />
        </Pressable>
      ))}
    </View>
    );
  };

  return (
    <View style={styles.gameboardContainer}>
      <View style={styles.diceRow}>
        {gameState === 'Initial' ? null : renderDice()}
      </View>
      <Text style={styles.scoreText}>Score: {totalScore}</Text>
      <Text style={styles.text}>Throws left: {throwsLeft}</Text>
      <Text style={styles.status}>{gameStatus}</Text>
      <Text style={styles.text}>{gameState === 'Win' ? 'Bonus reached!' : "You are " + (BONUS - totalScore) + " points from bonus" }</Text>
      <Pressable
        style={styles.button}
        onPress={throwDice}
      >
        <Text style={styles.buttonText}>Throw dice</Text>
      </Pressable>
      {renderScore()}
    </View>
  );
}