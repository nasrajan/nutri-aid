import unittest, time
from selenium import webdriver


class NutritionAid(unittest.TestCase):
    def setUp(self):
        # create a new Chrome session
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        # navigate to the application home page
        self.driver.get("file:///Users/priyanka/Documents/GitHub/nutri-assist/UI/index.html")

    # def test_sign_up(self):
    #     # get the options like home, about, sign in, sign up
    #     signup_link = self.driver.find_element_by_link_text('Sign Up')
    #     signup_link.click()
    #     self.driver.implicitly_wait(3000)
    #     signupNameInput = self.driver.find_element_by_id("nameInput")
    #     signupEmailInput = self.driver.find_element_by_id("emailInput")
    #     signupPasswordInput = self.driver.find_element_by_id("passwordInput")
    #     signupConfirmPasswordInput = self.driver.find_element_by_id("confirmPasswordInput")
    #     signupQuestion1Input = self.driver.find_element_by_id("q1")
    #     signupAnswer1Input = self.driver.find_element_by_id("a1Input")
    #     signupQuestion2Input = self.driver.find_element_by_id("q2")
    #     signupAnswer2Input = self.driver.find_element_by_id("a2Input")
    #     signupSubmitButton = self.driver.find_element_by_id("submitButton")
    #     signupNameInput.clear()
    #     signupNameInput.send_keys("aaa")
    #     time.sleep(5)
    #     signupEmailInput.clear()
    #     signupEmailInput.send_keys("aaa@gmail.com")
    #     time.sleep(5)
    #     signupPasswordInput.clear()
    #     signupPasswordInput.send_keys("aaaaaaa")
    #     time.sleep(5)
    #     signupConfirmPasswordInput.clear()
    #     signupConfirmPasswordInput.send_keys("aaaaaaa")
    #     time.sleep(5)
    #     signupQuestion1Input.clear()
    #     signupQuestion1Input.send_keys("What is your father's middle name?")
    #     time.sleep(5)
    #     signupAnswer1Input.clear()
    #     signupAnswer1Input.send_keys("rrr")
    #     time.sleep(5)
    #     signupQuestion2Input.clear()
    #     signupQuestion2Input.send_keys("What city were you born in?")
    #     time.sleep(5)
    #     signupAnswer2Input.clear()
    #     signupAnswer2Input.send_keys("www")
    #     time.sleep(5)
    #     signupSubmitButton.click()
    #     time.sleep(15)
    #
    def test_sign_in(self):
        # get the options like home, about, sign in, sign up
        sign_in = self.driver.find_element_by_link_text('Sign In')
        sign_in.click()
        self.driver.implicitly_wait(3000)
        signinEmailInput = self.driver.find_element_by_id("signinEmailInput")
        signinPasswordInput = self.driver.find_element_by_id("signinPasswordInput")
        signinSubmitButton = self.driver.find_element_by_id("signinSubmitButton")
        signinEmailInput.clear()
        signinEmailInput.send_keys("123@gmail.com")
        time.sleep(5)
        signinPasswordInput.clear()
        signinPasswordInput.send_keys("1234abcd")
        time.sleep(5)
        signinSubmitButton.click()
        sign_out = self.driver.find_element_by_link_text('Sign Out')
        self.assertTrue(sign_out)
        time.sleep(15)

    def test_search(self):
        # get the options like home, about, sign in, sign up
        search_link = self.driver.find_element_by_id('searchInput')
        search_link.click()
        self.driver.implicitly_wait(3000)
        search_input = self.driver.find_element_by_id('searchInput')
        searchButton = self.driver.find_element_by_id('searchInputbutton')
        search_input.clear()
        search_input.send_keys("apple")
        time.sleep(5)
        searchButton.click()
        time.sleep(5)
        searchNextPage = self.driver.find_element_by_id('searchResults_next')
        searchNextPage.click()
        time.sleep(5)
        searchPreviousPage = self.driver.find_element_by_id('searchResults_previous')
        searchPreviousPage.click()
        time.sleep(15)

if __name__ == '__main__':
    unittest.main()
