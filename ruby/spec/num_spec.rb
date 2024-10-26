RSpec.describe 'Regular Expression for C++ integer literals' do

  # Define components
  let(:decimal_digit) { /[0-9]/ }
  let(:hex_digit) { /[0-9a-fA-F]/ }
  let(:octal_digit) { /[0-7]/ }
  let(:binary_digit) { /[01]/ }

  let(:decimal) { /0|[1-9]#{decimal_digit}*/ }
  let(:hexadecimal) { /0[xX]#{hex_digit}+/ }
  let(:octal) { /0#{octal_digit}+/ }
  let(:binary) { /0[bB]#{binary_digit}+/ }
  let(:size) { /([uU](ll|LL|l|L)?)|([lL]{1,2}[uU]?)?/ }

  let(:pattern) { /^-?(#{decimal}|#{hexadecimal}|#{octal}|#{binary})#{size}?$/ }

  # Test cases (Pass)
  let(:should_pass) { 
    [
      "123", "0", "-33", "0x1A3F", "0X4B2", 
      "0755", "0b1010", "1ul", "1u", "1ll", 
      "-0xA5uL", "0B1100", "0b1", "0xABCDEF"
    ]
  }

  # Test cases (Fail)
  let(:should_fail) { 
    [
      "'1'", "1'''3", "afed", "+33", 
      "0xGHI", "0b210", "ul", "lll", "3lll", "3uuull", 
      "0x", "0b", "0o123", "0x123u123"
    ]
  }

  describe 'should pass' do
    it 'matches all expected strings' do
      should_pass.each do |str|
        expect(str).to match(pattern)
      end
    end
  end

  describe 'should fail' do
    it 'does not match any of the strings' do
      should_fail.each do |str|
        expect(str).not_to match(pattern)
      end
    end
  end
end
