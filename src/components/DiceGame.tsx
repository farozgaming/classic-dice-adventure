
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InfoIcon, ArrowUp, ArrowDown, Star, Heart, Share, MonitorIcon, VolumeIcon, ZapIcon, LayoutGrid, RefreshCw, HelpCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const DiceGame = () => {
  const [amount, setAmount] = useState("0");
  const [winAmount, setWinAmount] = useState("0.0000");
  const [sliderValue, setSliderValue] = useState(50);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Calculate win amount whenever slider value changes
    if (amount) {
      const calculatedWin = parseFloat(amount) * (100 / sliderValue);
      setWinAmount(calculatedWin.toFixed(4));
    }
  }, [sliderValue, amount]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const presetAmounts = ["10.0k", "100.0k", "1.0M", "10.0M"];

  const rollDice = () => {
    if (isRolling) return;
    
    // Start rolling animation
    setIsRolling(true);
    setDiceResult(null);
    
    setTimeout(() => {
      // Generate a random number between 0 and 100
      const result = Math.floor(Math.random() * 100) + 1;
      setDiceResult(result);
      
      // In a real game, the win/loss would be calculated based on the slider value and bet amount
      if (result < sliderValue) {
        const calculatedWin = parseFloat(amount) * (100 / sliderValue);
        setWinAmount(calculatedWin.toFixed(4));
        toast({
          title: "You won!",
          description: `${calculatedWin.toFixed(4)} coins added to your balance.`,
          variant: "default",
        });
      } else {
        setWinAmount("0.0000");
        toast({
          title: "You lost!",
          description: "Better luck next time.",
          variant: "destructive",
        });
      }
      setIsRolling(false);
    }, 1000); // Simulate dice roll delay
  };

  const multiplier = (100 / sliderValue).toFixed(4);
  const winChance = sliderValue.toFixed(2);

  return (
    <div className="flex-1 bg-dark-200 p-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/5 bg-dark-300 rounded-lg p-5">
          <Tabs defaultValue="manual">
            <TabsList className="grid grid-cols-3 w-full bg-dark-200 mb-4">
              <TabsTrigger value="manual" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manual</TabsTrigger>
              <TabsTrigger value="auto" className="data-[state=active]:bg-primary data-[state=active]:text-white">Auto</TabsTrigger>
              <TabsTrigger value="advanced" className="relative data-[state=active]:bg-primary data-[state=active]:text-white">
                Advanced
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-[10px] text-black px-1 rounded">New</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-300">Amount</span>
                  <InfoIcon className="h-4 w-4 text-gray-500 ml-2" />
                </div>
                
                <div className="flex space-x-2 mb-4">
                  <div className="bg-dark-200 rounded-md flex-1">
                    <div className="flex items-center px-3 py-2">
                      <span className="mr-2">🇮🇩</span>
                      <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="bg-transparent border-none focus:outline-none text-white w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="outline" className="bg-dark-200 hover:bg-dark-100 text-white">1/2</Button>
                    <Button variant="outline" className="bg-dark-200 hover:bg-dark-100 text-white">2×</Button>
                    <div className="relative inline-block">
                      <button className="bg-dark-200 hover:bg-dark-100 text-white px-3 py-2 rounded-md h-full">
                        <div className="flex flex-col items-center">
                          <ArrowUp className="h-3 w-3" />
                          <ArrowDown className="h-3 w-3" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {presetAmounts.map((presetAmount, index) => (
                    <button
                      key={index}
                      className="bg-dark-200 hover:bg-dark-100 text-white py-1 px-3 rounded-md text-sm"
                      onClick={() => setAmount(presetAmount)}
                    >
                      {presetAmount}
                    </button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-300 mb-2">Win Amount</div>
                  <div className="bg-dark-200 rounded-md">
                    <div className="flex items-center px-3 py-2">
                      <span className="mr-2">🇮🇩</span>
                      <input
                        type="text"
                        value={winAmount}
                        readOnly
                        className="bg-transparent border-none focus:outline-none text-white w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={rollDice}
                  disabled={isRolling}
                  className={`w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-md ${isRolling ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isRolling ? "Rolling..." : "Roll Now"}
                </Button>
                
                <div className="text-gray-500 text-sm text-center mt-2 flex items-center justify-center">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  <span>Betting with $0 will enter demo mode.</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="auto">
              <div className="text-center text-gray-400 py-10">Auto betting features would go here</div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="text-center text-gray-400 py-10">Advanced betting features would go here</div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:flex-1 bg-dark-300 rounded-lg p-5">
          <div className="text-gray-300 mb-4">Game Result</div>
          
          <div className="flex flex-col items-center justify-center h-48">
            {isRolling ? (
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            ) : diceResult !== null ? (
              <div className="bg-white rounded-lg p-6 flex items-center justify-center mb-10 w-24 h-24 shadow-lg">
                <div className="text-4xl font-bold text-black">{diceResult.toFixed(2)}</div>
              </div>
            ) : (
              <div className="text-gray-400">Roll the dice to see the result</div>
            )}
          </div>
          
          {/* New Custom Slider with the provided style */}
          <div className="mt-8">
            <div className="px-4 py-4 bg-[#4A5354] rounded-full flex items-center relative mx-2 h-[58px]" ref={sliderContainerRef}>
              <div className="px-2 bg-[#292D2E] rounded-full flex items-center flex-1 h-6 relative">
                <div className="flex flex-col items-center user-select-none touch-none w-full relative">
                  <div className="bg-[#FF9820] rounded-full w-full relative flex-grow h-[10px]">
                    <div 
                      className="absolute rounded-full h-[10px] bg-gradient-to-r from-[#31EE88] to-[#9FE871]"
                      style={{ left: 0, right: `${100 - sliderValue}%` }}
                    ></div>
                    <span 
                      role="slider"
                      aria-valuetext={sliderValue.toString()}
                      aria-valuemin={1}
                      aria-valuemax={98}
                      aria-orientation="horizontal"
                      className="absolute w-8 h-9 cursor-pointer z-20"
                      style={{
                        backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABICAYAAABGOvOzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJJSURBVHgB7ZxBTsJQEIb/FkmADbhjReqKpXIC9QZ6E2+gN1BPoN5ATwCeQLwANmHDDhISQkLgOUNblFIKadDAm/mSH8jQt5if9x5tMvMcbIkxpkJvV6Rz0hnJI1WwHwxIPqlNapHeHMcZYBdQ4h7pgdQ3h8UTyUNWaHCFdG8On/u0PJ01yXv01kQwzW3AJ13SsvDjX7jxACXP69um5BmP1AxzW2JpBlj4y8fxEZsJCwNMsMt/wN7kI3xSI/qX+L0EbmF/8oyHINc58xkQTv0vyOKEl0I0A+4gjxt+ccK134c8eA844RlwBZnMb+3ZgAvI5ZwNOIVczngP4PW/L091/82ADTAQzBEyMplMEuP5fD513Gw2w3Q6XYnncjm4rvtnY9eR2YBOp5MYr9frqePG4zG63e5KvFgsolarpY4dDofo9Xor8XK5jGq1iixks80i1AAIRw2AcNQACEcNgHDUAAhHDYBw1AAIRw2AcNQACEcNgHDUAAhHDYBw1AAIRw2AcNQACEcNgHDUAAhHDYBwMtcJjkajxHipVEodx6VuXCkWh8vcCoVC6lguzUsqz+PSvE3leesQXyjJS2A3DYaHyYAN8CGXecfIJ+TSZgNakEsrapnhhimJJfPHbtg/9wJ5PHPu2jbHn8JW0kfI4TFqn9XW2SgaBi5h932Bj6B5enHzt/QwFE6La9hpgk+6jp8hoAcoJF0dXtiAHRsj59BISn4rTHCIyrM5LPjAFz74xduUn4MtMT/H6Fwg6Db1sJ/H6LyTXrc9RucbdFjonenZgYsAAAAASUVORK5CYII=')`,
                        backgroundSize: '100% 100%',
                        top: '-14px',
                        left: `calc(${sliderValue}%)`,
                        transform: 'translateX(-50%)'
                      }}
                      tabIndex={0}
                    >
                      <input 
                        ref={sliderRef}
                        type="range"
                        min={1}
                        max={98}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="opacity-0 w-full h-full cursor-pointer absolute"
                      />
                    </span>
                  </div>
                  <div className="text-[#B3BEC1] text-sm w-full relative mt-10">
                    <span className="absolute left-0 transform -translate-x-1">0</span>
                    <span className="absolute left-1/4 transform -translate-x-2">25</span>
                    <span className="absolute left-1/2 transform -translate-x-2">50</span>
                    <span className="absolute left-3/4 transform -translate-x-2">75</span>
                    <span className="absolute left-full transform -translate-x-3">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-12 bg-dark-200 rounded-lg p-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Payout</div>
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={multiplier} 
                  readOnly 
                  className="bg-transparent border-none text-white font-bold flex-1 focus:outline-none" 
                />
                <span className="text-gray-400">×</span>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-sm mb-1">Roll Under</div>
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={sliderValue.toFixed(2)} 
                  readOnly 
                  className="bg-transparent border-none text-white font-bold flex-1 focus:outline-none" 
                />
                <span className="text-green-500">≤</span>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-sm mb-1">Win Chance</div>
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={winChance} 
                  readOnly 
                  className="bg-transparent border-none text-white font-bold flex-1 focus:outline-none" 
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-dark-300 rounded-lg p-3 flex justify-between">
        <div className="flex space-x-4">
          <Star className="text-gray-500 h-5 w-5" />
          <Heart className="text-gray-500 h-5 w-5" />
          <Share className="text-gray-500 h-5 w-5" />
        </div>
        
        <div className="flex space-x-4">
          <MonitorIcon className="text-gray-500 h-5 w-5" />
          <VolumeIcon className="text-gray-500 h-5 w-5" />
          <ZapIcon className="text-gray-500 h-5 w-5" />
          <LayoutGrid className="text-gray-500 h-5 w-5" />
          <RefreshCw className="text-gray-500 h-5 w-5" />
          <HelpCircle className="text-gray-500 h-5 w-5" />
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Classic Dice</h2>
          <div className="text-gray-400 text-sm">By BC Originals</div>
        </div>
        
        <div className="flex space-x-2">
          <span className="bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full text-xs"># BC Originals</span>
          <span className="bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full text-xs"># Dice</span>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;

